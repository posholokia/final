from django.urls import path
from service.api import *
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register('machine', MachineViewSet, basename='machine')
router.register('maintenance', MaintenanceViewSet, basename='maintenance')
router.register('complaints', ComplaintsViewSet, basename='complaints')


urlpatterns = [
    path('type_maintenance/', TypeMaintenanceList.as_view(), name='type_maintenance_list'),
    path('type_failure/', TypeFailureList.as_view(), name='type_failure_list'),
    path('recovery/', RecoveryMethodList.as_view(), name='recovery_list'),
]

urlpatterns += router.urls
