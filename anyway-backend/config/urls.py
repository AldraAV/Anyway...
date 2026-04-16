from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from transcriptions.views import TranscriptionViewSet
from users.views import ProfileView

router = DefaultRouter()
router.register(r"transcriptions", TranscriptionViewSet, basename="transcription")

urlpatterns = [
    path("admin/",               admin.site.urls),
    # Resources
    path("api/auth/me/",         ProfileView.as_view(),         name="profile"),
    path("api/",                 include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

