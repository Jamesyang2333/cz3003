from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
import time
from ccs.test import allAssistance, dengueSummaryByRegion, hazeSummaryByRegion
from backend.sms import sendSMS

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend', backend='redis://localhost', broker='redis://')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))


@app.task
def sample_print(content):
    while True:
        print("hello")
        time.sleep(5)


@app.task
def facebook_manager():
    pass


@app.task
def twitter_manager():
    pass


@app.task
def sms_manager():
    currentIDs = set()
    while True:
        allEvents = allAssistance()
        for record in allEvents:
            if not (record[0] in currentIDs):
                currentIDs.add(record[0])
                emergencyType = 'Haze'
                if(record[-1] == 'dengue'):
                    emergencyType = 'Dengue'
                assistanceType = 'Emergency Ambulance'
                if(record[4] == 'rescueEvacuation'):
                    assistanceType = 'Rescue Evacuation'
                sendSMS(emergencyType, assistanceType, record[2], 'SCDF')
        time.sleep(60)
            


@app.task
def email_manager():
    pass
