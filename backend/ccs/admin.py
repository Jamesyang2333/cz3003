from django.contrib import admin

# Register your models here.
from .models import Record


class PostAdmin(admin.ModelAdmin):
    list_display = ('record_id', 'date', 'incident_type', 'number_of_injured', 'number_of_death', 'incident_status',
                    'incident_region')
    list_filter = ('date', 'incident_status', 'incident_type')
    ordering = ['incident_status', 'date']


admin.site.register(Record, PostAdmin)
