from django.contrib import admin
from .models import Transcription


@admin.register(Transcription)
class TranscriptionAdmin(admin.ModelAdmin):
    list_display  = ["title", "user", "source", "status", "language", "created_at"]
    list_filter   = ["status", "source", "language"]
    search_fields = ["title", "user__email", "source_url"]
    readonly_fields = ["id", "raw_text", "translated_text", "summary",
                       "key_points", "language", "duration_secs",
                       "error_msg", "created_at", "updated_at"]
