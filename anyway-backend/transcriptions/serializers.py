from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Transcription

User = get_user_model()


class TranscriptionListSerializer(serializers.ModelSerializer):
    """Vista ligera para la tabla del dashboard."""
    class Meta:
        model  = Transcription
        fields = ["id", "title", "source", "status", "language", "duration_secs", "created_at"]


class TranscriptionDetailSerializer(serializers.ModelSerializer):
    """Vista completa para la pantalla de detalle."""
    class Meta:
        model  = Transcription
        fields = "__all__"
        read_only_fields = ["id", "user", "status", "raw_text", "translated_text",
                            "summary", "key_points", "language", "duration_secs",
                            "error_msg", "created_at", "updated_at"]


class CreateTranscriptionSerializer(serializers.ModelSerializer):
    """Payload de entrada para crear una transcripción."""
    class Meta:
        model  = Transcription
        fields = ["title", "source", "source_url", "file"]

    def validate(self, attrs):
        source = attrs.get("source")
        if source == "youtube" and not attrs.get("source_url"):
            raise serializers.ValidationError({"source_url": "Se requiere URL para fuente YouTube."})
        if source == "file" and not attrs.get("file"):
            raise serializers.ValidationError({"file": "Se requiere archivo para fuente 'file'."})
        return attrs
