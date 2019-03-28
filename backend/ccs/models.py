
# Create your models here.
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class dengueManager(models.Manager):
    def get_queryset(self):
        return super(dengueManager,
                     self).get_queryset() \
            .filter(incident_type='dengue')


class hazeManager(models.Manager):
    def get_queryset(self):
        return super(hazeManager,
                     self).get_queryset() \
            .filter(incident_type='haze')


class Record(models.Model):
    objects = models.Manager()
    dengue = dengueManager()
    haze = hazeManager()

    INCIDENT_CHOICES = (
        ('dengue', 'Dengue'),
        ('haze', 'Haze'),
    )

    ASSISTANCE_CHOICES = (
        ('emergencyAmbulance', 'Emergency Ambulance'),
        ('rescueEvacuation', 'Rescue Evacuation'),
        ('none', 'None')
    )

    REGION_CHOICES = (
        ('southWest', 'South West'),
        ('northWest', 'NorthWest'),
        ('central', 'Central'),
        ('northEast', 'North East'),
        ('southEast', 'South East'),
    )

    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('resolved', 'Resolved'),
    )

    # record the date when the record is created and updated
    date = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    record_id = models.AutoField(primary_key=True)

    # information related to report person
    report_person_name = models.CharField(max_length=20)
    report_person_phone = models.CharField(max_length=12)
    report_person_location = models.CharField(max_length=200)

    # information related to incident
    incident_location = models.CharField(max_length=200)
    incident_region = models.CharField(
        max_length=20, choices=REGION_CHOICES, default='southWest')
    incident_type = models.CharField(max_length=10,
                                     choices=INCIDENT_CHOICES,
                                     default='dengue')
    incident_assistance_required = models.CharField(max_length=20,
                                                    choices=ASSISTANCE_CHOICES,
                                                    default='none')
    incident_status = models.CharField(max_length=20,
                                       choices=STATUS_CHOICES,
                                       default='pending')

    # key indicators
    number_of_injured = models.IntegerField(null=True, blank=True)
    number_of_death = models.IntegerField(null=True, blank=True)
    pollutant_standards_index = models.IntegerField(blank=True, null=True)
    # this variable performs the function of storing lasting time
    estimated_starting_time = models.DateTimeField(
        null=True, blank=True)
    
    class Meta:
        ordering = ('record_id',)

    def __str__(self):
        return str(self.record_id)
