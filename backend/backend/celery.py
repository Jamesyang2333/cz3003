from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
import time
from ccs.test import allAssistance, dengueSummaryByRegion, hazeSummaryByRegion, dengueAllData, hazeAllData
from backend.sms import sendSMS
from backend.facebook import postFacebook

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

#previousPostDengueList = [] #declare outside as global
#previousPostHazeList = [] #declare outside as global
previousDengueDictionary = {} #declare outside as global
previousHazeDictionary = {} #declare outside as global
@app.task
def facebook_manager():
    while True:

        # retrieve classification region and level
        dengueDictionary = dengueSummaryByRegion
        hazeDictionary = hazeSummaryByRegion

        # retrieve all dataset from database dont need this actually
        #dengueList = dengueAllData
        #hazeList = hazeAllData

        #if no previous dengue data to compare, just post(usually for 1st ever run only)
        if not previousDengueDictionary:
            postFacebook('Dengue', dengueDictionary)
            return

        # if no previous haze data to compare, just post(usually for 1st ever run only)
        if not previousHazeDictionary:
            postFacebook('Dengue', hazeDictionary)
            return

        #compare previous data with current data to check for any changes. If there is a change, post facebook
        regionList = ['southWest', 'northWest', 'central', 'northEast', 'southEast']
        dengueChanged = False
        hazeChanged = False
        unchangedDengueRegionList = []
        unchangedHazeRegionList = []
        for region in regionList:
            dengueClassification = dengueDictionary[region]['class']
            hazeClassification = hazeDictionary[region]['class']
            prevDengueClass = previousDengueDictionary[region]['class']
            prevHazeClass = previousHazeDictionary[region]['class']

            if dengueClassification == prevDengueClass:
                dengueChanged= True
                unchangedDengueRegionList.append(region)

            if hazeClassification == prevHazeClass:
                hazeChanged= True
                unchangedHazeRegionList.append(region)

        #if there are no changes to the situation, dont update facebook
        if dengueChanged == False and hazeChanged == False:
            return
        #else update facebook
        if(dengueChanged==True):
            previousDengueDictionary = dengueDictionary #set previousDengue dictionary to become current first(cuz we need to compare all 5 regions)
            for region in unchangedDengueRegionList:
                del dengueDictionary[region]
            postFacebook('Dengue', dengueDictionary)

        if (hazeChanged == True):
            previousHazeDictionary = hazeDictionary  # set previousDengue dictionary to become current first(cuz we need to compare all 5 regions)
            for region in unchangedHazeRegionList:
                del hazeDictionary[region]
            postFacebook('Haze', dengueDictionary)

        time.sleep(5)


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
