from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display  = ["email", "username", "plan", "is_active", "created_at"]
    list_filter   = ["plan", "is_active"]
    search_fields = ["email", "username"]
    fieldsets     = BaseUserAdmin.fieldsets + (
        ("Anyway", {"fields": ("plan",)}),
    )
