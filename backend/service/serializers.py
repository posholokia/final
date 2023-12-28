from rest_framework import serializers
from .models import *

from django.contrib.auth import get_user_model

User = get_user_model()


class CatalogMixin:
    def get_catalog(self, obj):
        return obj._meta.verbose_name


class TechniqueModelSerializer(CatalogMixin, serializers.ModelSerializer):
    catalog = serializers.SerializerMethodField()

    class Meta:
        model = TechniqueModel
        fields = (
            'id',
            'name',
            'description',
            'catalog',
        )


class EngineModelSerializer(CatalogMixin, serializers.ModelSerializer):
    catalog = serializers.SerializerMethodField()

    class Meta:
        model = EngineModel
        fields = (
            'id',
            'name',
            'description',
            'catalog',
        )


class TransmissionModelSerializer(CatalogMixin, serializers.ModelSerializer):
    catalog = serializers.SerializerMethodField()

    class Meta:
        model = TransmissionModel
        fields = (
            'id',
            'name',
            'description',
            'catalog',
        )


class DriveAxleModelSerializer(CatalogMixin, serializers.ModelSerializer):
    catalog = serializers.SerializerMethodField()

    class Meta:
        model = DriveAxleModel
        fields = (
            'id',
            'name',
            'description',
            'catalog',
        )


class SteerableAxleModelSerializer(CatalogMixin, serializers.ModelSerializer):
    catalog = serializers.SerializerMethodField()

    class Meta:
        model = SteerableAxleModel
        fields = (
            'id',
            'name',
            'description',
            'catalog',
        )


class TypeMaintenanceSerializer(CatalogMixin, serializers.ModelSerializer):
    catalog = serializers.SerializerMethodField()

    class Meta:
        model = TypeMaintenance
        fields = (
            'id',
            'name',
            'description',
            'catalog',
        )


class RecoveryMethodSerializer(CatalogMixin, serializers.ModelSerializer):
    catalog = serializers.SerializerMethodField()

    class Meta:
        model = RecoveryMethod
        fields = (
            'id',
            'name',
            'description',
            'catalog',
        )


class TypeFailureSerializer(CatalogMixin, serializers.ModelSerializer):
    catalog = serializers.SerializerMethodField()

    class Meta:
        model = TypeFailure
        fields = (
            'id',
            'name',
            'description',
            'catalog',
        )


class ServiceCompanySerializer(CatalogMixin, serializers.ModelSerializer):
    catalog = serializers.SerializerMethodField()

    class Meta:
        model = ServiceCompany
        fields = (
            'id',
            'name',
            'description',
            'catalog',
        )


class UserSerializer(serializers.ModelSerializer):
    catalog = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'role',
            'catalog',
        )

    def get_catalog(self, obj):
        return 'Клиент'


class MachineListSerializer(serializers.ModelSerializer):
    """Сериализотор машин"""
    technique_model = TechniqueModelSerializer(many=False, read_only=True)
    engine_model = EngineModelSerializer(many=False, read_only=True)
    transmission_model = TransmissionModelSerializer(many=False, read_only=True)
    drive_axle_model = DriveAxleModelSerializer(many=False, read_only=True)
    steerable_axle_model = SteerableAxleModelSerializer(many=False, read_only=True)
    client = UserSerializer(many=False, read_only=True)
    service_company = ServiceCompanySerializer(many=False, read_only=True)

    # technique_model = serializers.SerializerMethodField()
    # engine_model = serializers.SerializerMethodField()
    # transmission_model = serializers.SerializerMethodField()
    # drive_axle_model = serializers.SerializerMethodField()
    # steerable_axle_model = serializers.SerializerMethodField()
    # client = serializers.SerializerMethodField()
    # service_company = serializers.SerializerMethodField()

    class Meta:
        model = Machine
        fields = (
            'id',
            'factory_number',
            'technique_model',
            'engine_model',
            'engine_number',
            'transmission_model',
            'transmission_number',
            'drive_axle_model',
            'drive_axle_number',
            'steerable_axle_model',
            'steerable_axle_number',
            'supply_contract',
            'date_of_shipment_from_the_factory',
            'consignee',
            'delivery_address',
            'equipment',
            'client',
            'service_company',
        )

    # def get_technique_model(self, obj):
    #     return obj.technique_model.name
    #
    # def get_engine_model(self, obj):
    #     return obj.engine_model.name
    #
    # def get_transmission_model(self, obj):
    #     return obj.transmission_model.name
    #
    # def get_drive_axle_model(self, obj):
    #     return obj.drive_axle_model.name
    #
    # def get_steerable_axle_model(self, obj):
    #     return obj.steerable_axle_model.name
    #
    # def get_client(self, obj):
    #     return obj.client.first_name
    #
    # def get_service_company(self, obj):
    #     return obj.service_company.name


class MachineListNoAuthSerializer(serializers.ModelSerializer):
    """Сериализотор машин"""
    technique_model = TechniqueModelSerializer(many=False, read_only=True)
    engine_model = EngineModelSerializer(many=False, read_only=True)
    transmission_model = TransmissionModelSerializer(many=False, read_only=True)
    drive_axle_model = DriveAxleModelSerializer(many=False, read_only=True)
    steerable_axle_model = SteerableAxleModelSerializer(many=False, read_only=True)

    class Meta:
        model = Machine
        fields = (
            'id',
            'factory_number',
            'technique_model',
            'engine_model',
            'engine_number',
            'transmission_model',
            'transmission_number',
            'drive_axle_model',
            'drive_axle_number',
            'steerable_axle_model',
            'steerable_axle_number',
        )


class MaintenanceListSerializer(serializers.ModelSerializer):
    """Сериализотор ТО"""
    machine = serializers.SerializerMethodField()
    service_company = ServiceCompanySerializer(many=False, read_only=True)
    type_maintenance = TypeMaintenanceSerializer(many=False, read_only=True)

    class Meta:
        model = Maintenance
        fields = (
            'id',
            'machine',
            'service_company',
            'type_maintenance',
            'maintenance_date',
            'operating_time',
            'order',
            'order_date',
            'company_executor',
        )

    def get_machine(self, obj):
        return obj.machine.factory_number


class ComplaintsListSerializer(serializers.ModelSerializer):
    """Сериализотор рекламаций"""
    machine = serializers.SerializerMethodField()
    service_company = ServiceCompanySerializer(many=False, read_only=True)
    machine_components = TypeFailureSerializer(many=False, read_only=True)
    recovery_method = RecoveryMethodSerializer(many=False, read_only=True)

    class Meta:
        model = Complaints
        fields = (
            'id',
            'date_of_refusal',
            'operating_time',
            'machine_components',
            'failure_node',
            'recovery_method',
            'parts_used',
            'date_of_restoration',
            'equipment_downtime',
            'machine',
            'service_company',
        )

    def get_machine(self, obj):
        return obj.machine.factory_number


class MaintenanceUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintenance
        exclude = (
            'service_company',
        )

    def validate(self, attrs):
        machine = attrs['machine']
        attrs['service_company'] = machine.service_company
        return attrs


class TypeMaintenanceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeMaintenance
        fields = '__all__'


class ComplaintsUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaints
        exclude = (
            'service_company',
        )

    def validate(self, attrs):
        machine = attrs['machine']
        attrs['service_company'] = machine.service_company
        return attrs


class TypeFailureListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeFailure
        fields = '__all__'


class RecoveryMethodListSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecoveryMethod
        fields = '__all__'