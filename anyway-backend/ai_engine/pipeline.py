"""
ANYWAY... — Pipeline de IA
Usa exclusivamente Groq para transcripción, traducción y resumen.
No requiere modelos locales pesados.

Flujo:
  URL YouTube → yt-dlp (descarga audio mp3) → Groq Whisper (transcripción)
  Archivo     →                               → Groq Whisper (transcripción)
  Texto       →  (skip)                       → texto directo
                                              → Groq LLM (traducción + resumen)
"""
import os
import tempfile
from pathlib import Path
from django.conf import settings


# ── Groq client singleton ────────────────────────────────────────────────────
_groq_client = None

def _groq():
    global _groq_client
    if _groq_client is None:
        from groq import Groq
        _groq_client = Groq(api_key=settings.GROQ_API_KEY)
    return _groq_client


# ── 1. Descargar audio de YouTube ────────────────────────────────────────────
def download_youtube_audio(url: str, output_dir: str) -> str:
    """Descarga el audio de un video de YouTube. Retorna ruta al .mp3."""
    import yt_dlp

    output_template = str(Path(output_dir) / "%(id)s.%(ext)s")
    ydl_opts = {
        "format":     "bestaudio/best",
        "outtmpl":    output_template,
        "postprocessors": [{
            "key":            "FFmpegExtractAudio",
            "preferredcodec": "mp3",
        }],
        "quiet": True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
    return str(Path(output_dir) / f"{info['id']}.mp3")


# ── 2. Transcribir con Groq Whisper ─────────────────────────────────────────
def transcribe_audio(audio_path: str) -> dict:
    """
    Transcribe un archivo de audio usando Groq Whisper.
    Retorna: {"text": str, "language": str}
    Límite de Groq: 25MB por archivo.
    """
    client = _groq()
    with open(audio_path, "rb") as f:
        response = client.audio.transcriptions.create(
            file=f,
            model="whisper-large-v3",
            response_format="verbose_json",  # incluye language detectado
        )
    return {
        "text":     response.text,
        "language": getattr(response, "language", "es"),
    }


# ── 3. Traducir con Groq LLM ────────────────────────────────────────────────
def translate_text(text: str, src_lang: str = "en", tgt_lang: str = "es") -> str:
    """Traduce texto usando Groq LLM. Si src == tgt, retorna el original."""
    if src_lang == tgt_lang:
        return text

    lang_names = {"es": "Español", "en": "English", "fr": "Français", "de": "Deutsch"}
    target_name = lang_names.get(tgt_lang, tgt_lang)

    response = _groq().chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{
            "role": "user",
            "content": (
                f"Traduce el siguiente texto al {target_name}. "
                f"Responde SOLO con la traducción, sin explicaciones:\n\n{text[:4000]}"
            )
        }],
        temperature=0.2,
    )
    return response.choices[0].message.content.strip()


# ── 4. Resumen + puntos clave con Groq LLM ──────────────────────────────────
def generate_summary_and_keypoints(text: str) -> dict:
    """
    Genera resumen y puntos clave.
    Retorna: {"summary": str, "key_points": list[str]}
    """
    import json

    prompt = (
        "Analiza el siguiente texto y responde ÚNICAMENTE con JSON válido:\n"
        '{"summary": "resumen en 2-3 párrafos en español", '
        '"key_points": ["punto1", "punto2", "punto3", "punto4", "punto5"]}\n\n'
        f"Texto:\n{text[:5000]}"
    )

    response = _groq().chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )

    content = response.choices[0].message.content
    # Extraer el JSON aunque venga envuelto en texto
    start = content.find("{")
    end   = content.rfind("}") + 1
    try:
        data = json.loads(content[start:end])
        return {
            "summary":    data.get("summary", ""),
            "key_points": data.get("key_points", []),
        }
    except (json.JSONDecodeError, ValueError):
        return {"summary": content[:800], "key_points": []}


# ── Punto de entrada principal ───────────────────────────────────────────────
def process_transcription(transcription_id: str) -> None:
    """
    Ejecuta el pipeline completo para una Transcription.
    Llamado en hilo daemon desde el ViewSet.
    """
    import django
    # Asegurar que Django esté configurado (necesario en hilos)
    if not django.conf.settings.configured:
        django.setup()

    from transcriptions.models import Transcription

    t = Transcription.objects.get(id=transcription_id)
    t.status = "processing"
    t.save(update_fields=["status"])

    try:
        with tempfile.TemporaryDirectory() as tmpdir:

            # ── Texto directo (sin audio) ────────────────────────────────
            if t.source == "text":
                raw = t.source_url  # el texto se envía en source_url
                t.raw_text = raw
                t.language = "es"

            # ── URL de YouTube ───────────────────────────────────────────
            elif t.source == "youtube" and t.source_url:
                audio_path = download_youtube_audio(t.source_url, tmpdir)
                result = transcribe_audio(audio_path)
                t.raw_text = result["text"]
                t.language = result["language"]

            # ── Archivo subido ───────────────────────────────────────────
            elif t.source in ("file", "gmetrix") and t.file:
                result = transcribe_audio(t.file.path)
                t.raw_text = result["text"]
                t.language = result["language"]

            else:
                raise ValueError(f"Fuente '{t.source}' sin archivo ni URL válida.")

            # ── Traducir si no está en español ───────────────────────────
            target_lang = "es"
            if t.language and t.language != target_lang:
                t.translated_text = translate_text(
                    t.raw_text, src_lang=t.language, tgt_lang=target_lang
                )
            else:
                t.translated_text = t.raw_text

            # ── Resumen + puntos clave ────────────────────────────────────
            text_for_ai = t.translated_text or t.raw_text
            result = generate_summary_and_keypoints(text_for_ai)
            t.summary    = result["summary"]
            t.key_points = result["key_points"]
            t.status     = "done"

    except Exception as exc:
        t.status    = "error"
        t.error_msg = str(exc)[:1000]

    t.save()
