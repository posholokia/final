from django.contrib import admin
from .models import *


class ViewsAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    list_filter = ('name', 'description')
    search_fields = ('name', 'description')


admin.site.register(TechniqueModel, ViewsAdmin)
admin.site.register(EngineModel, ViewsAdmin)
admin.site.register(TransmissionModel, ViewsAdmin)
admin.site.register(DriveAxleModel, ViewsAdmin)
admin.site.register(SteerableAxleModel, ViewsAdmin)
admin.site.register(TypeMaintenance, ViewsAdmin)
admin.site.register(RecoveryMethod, ViewsAdmin)
admin.site.register(TypeFailure, ViewsAdmin)

admin.site.register(Machine)
admin.site.register(Maintenance)
admin.site.register(Complaints)
