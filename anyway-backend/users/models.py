from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Usuario extendido de Anyway."""
    email = models.EmailField(unique=True)
    plan  = models.CharField(max_length=20, default="free",
                             choices=[("free", "Gratis"), ("pro", "Pro"), ("enterprise", "Enterprise")])
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD  = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email
