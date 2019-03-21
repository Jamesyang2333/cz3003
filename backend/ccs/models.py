
# Create your models here.
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User





class Record(models.Model):
    INCIDENT_CHOICES = (
        ('dengue', 'Dengue'),
        ('haze', 'Haze'),
    )

    ASSISTANCE_CHOICES = (
        ('emergencyAmbulance', 'Emergency Ambulance'),
        ('rescueEvacuation', 'Rescue Evacuation'),
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
    incident_type = models.CharField(max_length=10,
                             choices=INCIDENT_CHOICES,
                             default='dengue')
    incident_assistanceRequired = models.CharField(max_length=20,
                             choices=ASSISTANCE_CHOICES,
                             default='emergencyAmbulance')
    incident_status = models.CharField(max_length=20,
                             choices=STATUS_CHOICES,
                             default='pending')


    # key indicators
    key_indicator_numOfInjured = models.IntegerField(null=True,blank=True)
    key_indicator_numOfdeaths = models.IntegerField(null=True,blank=True)
    # this variable performs the function of storing lasting time
    key_indicator_estimateStartingTime = models.DateTimeField(null=True,blank=True)

    class Meta:
        ordering = ('record_id',)

    def __str__(self):
        return str(self.record_id)





















