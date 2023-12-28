from django.db import models

from accounts.models import ServiceCompany
from silant import settings


class TechniqueModel(models.Model):
    """Справочник Модели техники"""
    name = models.TextField(unique=True, verbose_name='Название')
    description = models.TextField(blank=True, verbose_name='Описание')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Модель техники'
        verbose_name_plural = 'Модели техники'


class EngineModel(models.Model):
    """Справочник Модель двигателя"""
    name = models.TextField(unique=True, verbose_name='Название')
    description = models.TextField(blank=True, verbose_name='Описание')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Модель двигателя'
        verbose_name_plural = 'Модели двигателей'


class TransmissionModel(models.Model):
    """Справочник Модель трансмиссии"""
    name = models.TextField(unique=True, verbose_name='Название')
    description = models.TextField(blank=True, verbose_name='Описание')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Модель трансмиссии'
        verbose_name_plural = 'Модели трансмиссий'


class DriveAxleModel(models.Model):
    """Справочник Модель ведущего моста"""
    name = models.TextField(unique=True, verbose_name='Название')
    description = models.TextField(blank=True, verbose_name='Описание')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Модель ведущего моста'
        verbose_name_plural = 'Модели ведущих мостов'


class SteerableAxleModel(models.Model):
    """Справочник Модель управляемого моста"""
    name = models.TextField(unique=True, verbose_name='Название')
    description = models.TextField(blank=True, verbose_name='Описание')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Модель управляемого моста'
        verbose_name_plural = 'Модели управляемых мостов'


class TypeMaintenance(models.Model):
    """Справочник Вид ТО"""
    name = models.TextField(verbose_name='Название')
    description = models.TextField(blank=True, verbose_name='Описание')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Вид ТО'
        verbose_name_plural = 'Виды ТО'


class RecoveryMethod(models.Model):
    """Справочник Способ восстановления"""
    name = models.TextField(verbose_name='Название')
    description = models.TextField(blank=True, verbose_name='Описание')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Способ восстановления'
        verbose_name_plural = 'Способы восстановления'


class TypeFailure(models.Model):
    """Справочник Узлы машины"""
    name = models.TextField(verbose_name='Название')
    description = models.TextField(blank=True, verbose_name='Описание')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Узел машины'
        verbose_name_plural = 'Узлы машины'


class Machine(models.Model):
    factory_number = models.CharField('Зав. № машины', max_length=8, unique=True)
    technique_model = models.ForeignKey(TechniqueModel, on_delete=models.PROTECT, verbose_name='Модель техники')
    engine_model = models.ForeignKey(EngineModel, on_delete=models.PROTECT, verbose_name='Модель двигателя')
    engine_number = models.CharField('Зав. № двигателя', max_length=8)
    transmission_model = models.ForeignKey(
        TransmissionModel,
        on_delete=models.PROTECT,
        verbose_name='Модель трансмиссии',
    )
    transmission_number = models.CharField('Зав. № трансмиссии', max_length=16)
    drive_axle_model = models.ForeignKey(DriveAxleModel, on_delete=models.PROTECT, verbose_name='Модель ведущего моста')
    drive_axle_number = models.CharField('Зав. № ведущего моста', max_length=50)
    steerable_axle_model = models.ForeignKey(
        SteerableAxleModel,
        on_delete=models.PROTECT,
        verbose_name='Модель управляемого моста',
    )
    steerable_axle_number = models.CharField('Зав. № управляемого моста', max_length=50)
    supply_contract = models.CharField('Договор поставки №, дата.', max_length=50, blank=True)
    date_of_shipment_from_the_factory = models.DateField('Дата отгрузки с завода')
    consignee = models.CharField('Грузополучатель', max_length=50, blank=True)
    delivery_address = models.CharField('Адрес поставки (эксплуатации)', max_length=300, blank=True)
    equipment = models.CharField('Комплектация (доп. опции)', max_length=50, blank=True)
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='machine',
        verbose_name='Клиент',
        limit_choices_to={'role': 'CL'}
    )
    service_company = models.ForeignKey(
        ServiceCompany,
        null=True,
        related_name='machines_serviced',
        on_delete=models.SET_NULL,
        verbose_name='Сервисная компания',
    )

    def __str__(self):
        return f'{self.factory_number}'

    class Meta:
        verbose_name = 'Машина'
        verbose_name_plural = 'Машины'
        ordering = ['date_of_shipment_from_the_factory']


class Maintenance(models.Model):
    machine = models.ForeignKey(Machine, on_delete=models.PROTECT, verbose_name='Машина')
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.PROTECT, verbose_name='Сервисная компания')
    type_maintenance = models.ForeignKey(TypeMaintenance, on_delete=models.PROTECT, verbose_name='Вид ТО')
    maintenance_date = models.DateField('Дата проведения ТО')
    operating_time = models.IntegerField('Наработка м/часов')
    order = models.CharField('Номер заказа-наряда', max_length=50)
    order_date = models.DateField('Дата заказа-наряда')
    company_executor = models.CharField('Компания исполнитель', max_length=50)

    def __str__(self):
        return f'Машина: {self.machine.factory_number}, Вид ТО: {self.type_maintenance.name}'

    class Meta:
        verbose_name = 'ТО'
        verbose_name_plural = 'ТО'
        ordering = ['maintenance_date']


class Complaints(models.Model):
    date_of_refusal = models.DateField(verbose_name='Дата отказа')
    operating_time = models.IntegerField(verbose_name='Наработка м/час')
    machine_components = models.ForeignKey(TypeFailure, on_delete=models.PROTECT, verbose_name='Характер отказа')
    failure_node = models.TextField(verbose_name='Описание отказа ')
    recovery_method = models.ForeignKey(RecoveryMethod, on_delete=models.PROTECT, verbose_name='Способ восстановления')
    parts_used = models.TextField(blank=True, verbose_name='Используемые запасные части')
    date_of_restoration = models.DateField(verbose_name='Дата восстановления')
    equipment_downtime = models.TextField(verbose_name='Время простоя техники')
    machine = models.ForeignKey(Machine, on_delete=models.PROTECT, verbose_name='Машина')
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.PROTECT, verbose_name='Сервисная организация')

    def __str__(self):
        return f'{self.machine, self.failure_node}'

    class Meta:
        verbose_name = 'Рекламация'
        verbose_name_plural = 'Рекламации'
        ordering = ['date_of_refusal']
