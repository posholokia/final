from django.contrib import admin
from django import forms
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from .models import ServiceCompany
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class ServiceCompanyInline(admin.StackedInline):
    model = ServiceCompany
    can_delete = False
    verbose_name_plural = "Сервисные компании"


class CustomUserCreateForm(UserCreationForm):
    ROLES = (
        ('CL', 'Клиент'),
        ('SC', 'Сервисная компания'),
        ('MA', 'Менеджер'),
    )
    role = forms.ChoiceField(label=_("Role"), choices=ROLES)


class CustomUserAdmin(BaseUserAdmin):
    inlines = [ServiceCompanyInline]
    add_form = CustomUserCreateForm
    fieldsets = (
        (None, {"fields": ("username", "password", "role")}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "email")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "role", "password1", "password2"),
            },
        ),
    )


admin.site.register(User, CustomUserAdmin)
