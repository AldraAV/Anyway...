"""
Autenticación de Django vía Supabase JWT.

Supabase emite JWTs firmados con HS256 usando el JWT_SECRET del proyecto.
Django los verifica sin llamar a Supabase — solo con la clave secreta local.

Configuración necesaria en settings.py:
    SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")

Obtén el JWT_SECRET en:
    supabase.com → Tu proyecto → Settings → API → JWT Settings → JWT Secret
"""
import jwt
from django.contrib.auth import get_user_model
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings

User = get_user_model()


class SupabaseJWTAuthentication(BaseAuthentication):
    """
    Extrae el Bearer token del header Authorization,
    lo verifica con el JWT secret de Supabase,
    y retorna (user, token).

    Si el usuario no existe en la BD local, lo crea automáticamente.
    """

    def authenticate(self, request):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return None  # No es nuestro esquema

        token = auth_header.split(" ", 1)[1]
        secret = getattr(settings, "SUPABASE_JWT_SECRET", None)

        if not secret:
            raise AuthenticationFailed("SUPABASE_JWT_SECRET no está configurado en Django.")

        try:
            payload = jwt.decode(
                token,
                secret,
                algorithms=["HS256"],
                options={"verify_aud": False},  # Supabase usa audience "authenticated"
            )
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token expirado.")
        except jwt.InvalidTokenError as e:
            raise AuthenticationFailed(f"Token inválido: {e}")

        supabase_uid = payload.get("sub")
        email        = payload.get("email", "")

        if not supabase_uid:
            raise AuthenticationFailed("Token sin sub (user ID).")

        # Obtener o crear el usuario local vinculado al UID de Supabase
        user, _ = User.objects.get_or_create(
            username=supabase_uid,
            defaults={"email": email},
        )
        # Actualizar email si cambió en Supabase
        if email and user.email != email:
            user.email = email
            user.save(update_fields=["email"])

        return (user, token)

    def authenticate_header(self, request):
        return "Bearer"
