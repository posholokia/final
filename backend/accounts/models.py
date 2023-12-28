from django.db import models
from django.contrib.auth.models import AbstractUser

from silant import settings


class User(AbstractUser):
    ROLES = (
        ('CL', 'Клиент'),
        ('SC', 'Сервисная компания'),
        ('MA', 'Менеджер'),
    )
    role = models.CharField('Роль', max_length=2, choices=ROLES)

    def __str__(self):
        return f'{self.first_name}'


class ServiceCompany(models.Model):
    """Справочник Сервисные компании"""
    name = models.CharField('Название компании', max_length=32)
    description = models.TextField('Описание', max_length=500, blank=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name='service',
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'SC', 'service': None},
    )

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Сервисная компания'
        verbose_name_plural = 'Сервисные компании'
