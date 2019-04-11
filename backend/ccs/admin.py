from django.contrib import admin

# Register your models here.
from .models import Record


class PostAdmin(admin.ModelAdmin):
    list_display = ('record_id', 'incident_location', 'incident_type', 'number_of_injured', 'number_of_death', 'incident_status',
                    'incident_region')
    list_filter = ('date', 'incident_status', 'incident_type','incident_region')
    ordering = ['record_id']


admin.site.register(Record, PostAdmin)
