<div align="center">
  <h1 align="center">Anyway...</h1>
  <p align="center">
    <strong>La plataforma web definitiva para transformar contenido educativo en información accionable en segundos.</strong>
  </p>
</div>

<p align="center">
  <a href="#características">Características</a> •
  <a href="#arquitectura">Arquitectura</a> •
  <a href="#instalación-y-uso">Instalación</a> •
  <a href="#licencia">Licencia</a>
</p>

---

## 🎧 ¿Qué es Anyway...?

**Anyway...** es un asistente web diseñado para la transcripción y el procesamiento inteligente de contenido educativo multifuente. En lugar de ser un simple convertidor de formato, este sistema está construido para las personas que ya tienen acceso al contenido (cursos, lecciones de YouTube, archivos privados en GMetrix) y desean extraer lo que más importa de inmediato: **un texto ágil, resúmenes organizados, puntos clave detectados por IA y traducciones perfectas.**

El diseño, inspirado en la estética *«Aurora Visual Lava-Neón»*, brinda una inmersión visual mientras el sistema realiza trabajo pesado por debajo de la mesa.

---

## ✨ Características

- 🎯 **Multifuente:** Sincroniza audio desde YouTube, subidas de archivos locales (WAV, MP3, MP4) o introduce texto plano de forma directa.
- ⚡ **Generación por Groq IA:** Aprovecha un motor veloz impulsado por la API de Groq (`llama-3.1-8b-instant` / `whisper-large-v3`) para evitar tener pesados modelos locales en RAM.
- 🌍 **Detección Automática y Traducción:** Detecta el idioma nativo de la transcripción y lo traduce automáticamente a tu idioma de preferencia.
- 📝 **Puntos Clave y Resúmenes:** Extrae de manera inteligente lo esencial de clases que duran horas en sólo unos párrafos.
- 🔒 **Identidad Segura con Supabase:** Control de acceso, registro, JWT seguro y base de datos con PostgreSQL.

---

## 🛠 Arquitectura

| Componente       | Tecnologías Principales                              |
|------------------|-------------------------------------------------------|
| **Frontend**     | Next.js 16 (App Router) + React + Tailwind v4         |
| **Backend**      | Django 5 + Django REST Framework                      |
| **Base de Datos**| PostgreSQL (alojado en Supabase)                    |
| **Auth**         | Supabase Auth (`@supabase/ssr` / `supabase-js`)       |
| **Procesamiento**| Python (`yt-dlp` para descargas) + Groq API           |

---

## 💻 Instalación y Uso

Asegúrate de contar con `Node.js / pnpm` y `Python 3.11+` instalados.

### 1. Variables de Entorno
Tendrás que clonar o configurar tu proyecto desde Supabase y obtener tu API key de Groq.
Debes crear estos archivos:

**`anyway-frontend/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SUPABASE_URL=https://<TU_SUPABASE_PROJECT>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<TU_SUPABASE_ANON_KEY>
```

**`anyway-backend/.env`**
```env
DJANGO_SECRET_KEY=tu-django-secret
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000

DB_HOST=db.<TU_SUPABASE_PROJECT>.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=<TU_DB_PASSWORD>

SUPABASE_JWT_SECRET=<TU_JWT_SECRET>
GROQ_API_KEY=<TU_GROQ_API_KEY>
```

### 2. Frontend
```bash
cd anyway-frontend
pnpm install
pnpm dev
# Correrá en http://localhost:3000
```

### 3. Backend
```bash
cd anyway-backend
python -m venv .venv
# Activar el entorno virtual:
# Linux/macOS: source .venv/bin/activate
# Windows: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
# Correrá en http://localhost:8000
```

---

## 🖋 Créditos
Proyecto concebido y desarrollado por el equipo/autor del **Aldraverse** (`@AldraAV`). 

## ⚖️ Licencia
Este proyecto está bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.
