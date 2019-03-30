from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
import time
from ccs.test import allAssistance, dengueSummaryByRegion, hazeSummaryByRegion, dengueAllData, hazeAllData, hazeTotalDeath, hazeTotalInjured
from backend.sms import sendSMS
from backend.facebook import postFacebook
from backend.email import sendEmail 

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
@app.task
def facebook_manager():
    previousDengueDictionary = {} #declare outside as global
    previousHazeDictionary = {} #declare outside as global

    while True:

        # retrieve classification region and level
        dengueDictionary = dengueSummaryByRegion()
        hazeDictionary = hazeSummaryByRegion()

        # retrieve all dataset from database dont need this actually
        #dengueList = dengueAllData
        #hazeList = hazeAllData

        #if no previous dengue data to compare, just post(usually for 1st ever run only)
        if not previousDengueDictionary:
            print("POST FACEBOOK")
            previousDengueDictionary = dengueDictionary  # set previousDengue dictionary to become current first(cuz we need to compare all 5 regions)
            postFacebook('Dengue', dengueDictionary)

        # if no previous haze data to compare, just post(usually for 1st ever run only)
        print("printing haze")
        print(previousHazeDictionary)
        if not previousHazeDictionary:
            print("POST HAZE")
            previousHazeDictionary = hazeDictionary  # set previousDengue dictionary to become current first(cuz we need to compare all 5 regions)
            postFacebook('Haze', hazeDictionary)
            
        if previousDengueDictionary or previousHazeDictionary:
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
                    unchangedDengueRegionList.append(region)
                else:
                    dengueChanged= True

                if hazeClassification == prevHazeClass:
                    unchangedHazeRegionList.append(region)
                else:
                    hazeChanged = True

            #if there are no changes to the situation, dont update facebook
            print("hazechanged?")
            print(hazeChanged)
            print("denguechanged?")
            print(dengueChanged)
            #else update facebook
            if(dengueChanged==True):
                previousDengueDictionary = dengueDictionary.copy() #set previousDengue dictionary to become current first(cuz we need to compare all 5 regions)
                for region in unchangedDengueRegionList:
                    del dengueDictionary[region]
                postFacebook('Dengue', dengueDictionary)

            if (hazeChanged == True):
                previousHazeDictionary = hazeDictionary.copy()  # set previousDengue dictionary to become current first(cuz we need to compare all 5 regions)
                for region in unchangedHazeRegionList:
                    del hazeDictionary[region]
                postFacebook('Haze', hazeDictionary)

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
            

# need to add trends 
@app.task
def email_manager():
    dDictionary = dengueSummaryByRegion()
    hDictionary = hazeSummaryByRegion()

    message = ('Dear Prime Minister Sir, the summary report of haze and dengue details in Singapore are as follows:\n\n\n' + \
       
        '----- Dengue Report -----\n\n' + \

        'Dengue Zones Alert Levels across Singapore: \n' \
        'Southwest Singapore: ' + dDictionary['southWest']['class'] + '\n' \
        'Northwest Singapore: ' + dDictionary['northWest']['class'] + '\n' \
        'Central Singapore: ' + dDictionary['central']['class'] + '\n' \
        'Northeast Singapore: ' + dDictionary['northEast']['class'] + '\n' \
        'Southeast Singapore: ' + dDictionary['southEast']['class'] + '\n\n' \

        'Number of people infected with dengue across Singapore: \n' \
        'Southwest Singapore: ' + str(dDictionary['southWest']['numOfInjured']) + '\n' \
        'Northwest Singapore: ' + str(dDictionary['northWest']['numOfInjured']) + '\n' \
        'Central Singapore: ' + str(dDictionary['central']['numOfInjured']) + '\n' \
        'Northeast Singapore: ' + str(dDictionary['northEast']['numOfInjured']) + '\n' \
        'Southeast Singapore: ' + str(dDictionary['southeast']['numOfInjured']) + '\n' \
        
        'Number of dengue-related deaths across Singapore: \n' \
        'Southwest Singapore: ' + str(dDictionary['southWest']['numOfDeaths']) + '\n' \
        'Northwest Singapore: ' + str(dDictionary['northWest']['numOfDeaths']) + '\n' \
        'Central Singapore: ' + str(dDictionary['central']['numOfDeaths']) + '\n' \
        'Northeast Singapore: ' + str(dDictionary['northEast']['numOfDeaths']) + '\n' \
        'Southeast Singapore: ' + str(dDictionary['southeast']['numOfDeaths']) + '\n\n\n' \
    
        '----- Haze Report -----\n\n' \
        
        'PSI Levels and Air Quality Levels across Singapore: \n' \
        'SouthWest Singapore: ' + str(hDictionary['southWest']['PSI']) + ' (' + hDictionary['southWest']['class'] + ')' + '\n' \
        'NorthWest Singapore: ' + str(hDictionary['northWest']['PSI']) + ' (' + hDictionary['northWest']['class'] + ')' + '\n' \
        'Central Singapore: ' + str(hDictionary['central']['PSI']) + ' (' + hDictionary['central']['class'] + ')' + '\n' \
        'NorthEast Singapore: ' + str(hDictionary['northEast']['PSI']) + ' (' + hDictionary['northEast']['class'] + ')' +  '\n' \
        'SouthEast Singapore: ' + str(hDictionary['southEast']['PSI']) + ' (' + hDictionary['southWest']['class'] + ')' +  '\n\n' \

        'Total number of people with haze-related conditions across Singapore: ' + str(hazeTotalInjured()) + '\n' \
        'Total number of haze-related deaths across Singapore: ' + str(hazeTotalDeath()) + '\n')

    sendEmail(message)

    time.sleep(1800)










    

    
        



        




