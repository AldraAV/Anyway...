import threading
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Transcription
from .serializers import (
    TranscriptionListSerializer,
    TranscriptionDetailSerializer,
    CreateTranscriptionSerializer,
)
from ai_engine.pipeline import process_transcription


class TranscriptionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transcription.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action == "create":
            return CreateTranscriptionSerializer
        if self.action in ("retrieve", "update", "partial_update"):
            return TranscriptionDetailSerializer
        return TranscriptionListSerializer

    def perform_create(self, serializer):
        t = serializer.save(user=self.request.user, status="pending")
        # Procesa en hilo separado (MVP — sin Celery por ahora)
        thread = threading.Thread(
            target=process_transcription,
            args=(str(t.id),),
            daemon=True,
        )
        thread.start()

    @action(detail=True, methods=["post"])
    def retry(self, request, pk=None):
        """Re-procesa una transcripción fallida."""
        t = self.get_object()
        if t.status != "error":
            return Response({"detail": "Solo se pueden re-procesar transcripciones con error."},
                            status=status.HTTP_400_BAD_REQUEST)
        t.status    = "pending"
        t.error_msg = ""
        t.save(update_fields=["status", "error_msg"])
        thread = threading.Thread(target=process_transcription, args=(str(t.id),), daemon=True)
        thread.start()
        return Response({"detail": "Re-procesando."})
