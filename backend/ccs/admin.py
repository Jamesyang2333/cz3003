from django.contrib import admin

# Register your models here.
from .models import Record





class PostAdmin(admin.ModelAdmin):
    list_display = ('record_id','date', 'incident_type', 'key_indicator_numOfInjured', 'key_indicator_numOfdeaths','incident_status',
                    'incident_location')
    list_filter = ('date', 'incident_status', 'incident_type')
    ordering = ['incident_status', 'date']


admin.site.register(Record, PostAdmin)

