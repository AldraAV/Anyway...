import uuid
from django.db import models
from django.conf import settings


class Transcription(models.Model):
    """Una transcripción generada por Anyway."""

    SOURCE_CHOICES = [
        ("youtube", "YouTube"),
        ("file",    "Archivo"),
        ("text",    "Texto"),
        ("gmetrix", "GMetrix"),
    ]
    STATUS_CHOICES = [
        ("pending",    "Pendiente"),
        ("processing", "Procesando"),
        ("done",       "Completada"),
        ("error",      "Error"),
    ]

    id         = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user       = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="transcriptions")
    title      = models.CharField(max_length=255, blank=True)
    source     = models.CharField(max_length=20, choices=SOURCE_CHOICES)
    source_url = models.URLField(blank=True)
    file       = models.FileField(upload_to="uploads/", null=True, blank=True)

    # Resultados
    raw_text      = models.TextField(blank=True)
    translated_text = models.TextField(blank=True)
    summary       = models.TextField(blank=True)
    key_points    = models.JSONField(default=list)

    # Metadatos
    language      = models.CharField(max_length=10, blank=True, default="es")
    duration_secs = models.PositiveIntegerField(null=True, blank=True)
    status        = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    error_msg     = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title or self.source_url} — {self.user.email}"
