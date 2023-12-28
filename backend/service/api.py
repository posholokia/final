from django.contrib.auth.models import AnonymousUser
from rest_framework import permissions, viewsets, generics

from .models import *
from . import serializers
from .permissions import IsAdminOrReadOnly, IsStaffOrReadOnly


class MachineViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.MachineListSerializer
    queryset = Machine.objects.all()
    permission_classes = [permissions.AllowAny, ]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user

        if not isinstance(user, AnonymousUser):
            if user.role == 'CL':
                queryset = queryset.filter(client=user)
            elif user.role == 'SC':
                queryset = queryset.filter(service_company=user.service)

        return queryset

    def get_permissions(self):
        if self.action == 'create' or self.action == 'update':
            self.permission_classes = [permissions.IsAdminUser]

        return super().get_permissions()

    def get_serializer_class(self):
        user = self.request.user
        if isinstance(user, AnonymousUser):
            return serializers.MachineListNoAuthSerializer

        return super().get_serializer_class()


class MaintenanceViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.MaintenanceListSerializer
    queryset = Maintenance.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]

    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update':
            return serializers.MaintenanceUpdateSerializer

        return super().get_serializer_class()


class ComplaintsViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ComplaintsListSerializer
    queryset = Complaints.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsStaffOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update':
            return serializers.ComplaintsUpdateSerializer

        return super().get_serializer_class()


class TypeMaintenanceList(generics.ListAPIView):
    serializer_class = serializers.TypeMaintenanceListSerializer
    queryset = TypeMaintenance.objects.all()


class TypeFailureList(generics.ListAPIView):
    serializer_class = serializers.TypeFailureListSerializer
    queryset = TypeFailure.objects.all()


class RecoveryMethodList(generics.ListAPIView):
    serializer_class = serializers.RecoveryMethodListSerializer
    queryset = RecoveryMethod.objects.all()
