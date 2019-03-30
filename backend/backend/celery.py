from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
import time
from ccs.test import allAssistance, dengueSummaryByRegion, hazeSummaryByRegion, dengueAllData, hazeAllData
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
    previousdDictionary = {} 
    previoushDictionary = {}

    while True:

        dDictionary = dengueSummaryByRegion()
        hDictionary = hazeSummaryByRegion() 

        message = ('Dear Prime Minister Sir, the summary report of haze and dengue details are as follows:\n\n\n\n' + \

                '----- Dengue Report -----\n\n\n' + \

                'Dengue Zones Alert Levels across Singapore: \n\n' \
                'Southwest Singapore: ' + dDictionary['southWest']['class'] + '\n' \
                'Northwest Singapore: ' + dDictionary['northWest']['class'] + '\n' \
                'Central Singapore: ' + dDictionary['central']['class'] + '\n' \
                'Northeast Singapore: ' + dDictionary['northEast']['class'] + '\n' \
                'Southeast Singapore: ' + dDictionary['southEast']['class'] + '\n\n' \

                'Number of people infected with dengue across Singapore: \n\n' \
                'Southwest Singapore: ' + str(dDictionary['southWest']['numOfInjured']) + '\n' \
                'Northwest Singapore: ' + str(dDictionary['northWest']['numOfInjured']) + '\n' \
                'Central Singapore: ' + str(dDictionary['central']['numOfInjured']) + '\n' \
                'Northeast Singapore: ' + str(dDictionary['northEast']['numOfInjured']) + '\n' \
                'Southeast Singapore: ' + str(dDictionary['southEast']['numOfInjured']) + '\n\n' \
        
                'Number of dengue-related deaths across Singapore: \n\n' \
                'Southwest Singapore: ' + str(dDictionary['southWest']['numOfDeaths']) + '\n' \
                'Northwest Singapore: ' + str(dDictionary['northWest']['numOfDeaths']) + '\n' \
                'Central Singapore: ' + str(dDictionary['central']['numOfDeaths']) + '\n' \
                'Northeast Singapore: ' + str(dDictionary['northEast']['numOfDeaths']) + '\n' \
                'Southeast Singapore: ' + str(dDictionary['southEast']['numOfDeaths']) + '\n\n\n' \
    
                '----- Haze Report -----\n\n\n' \
        
                'PSI Levels and Air Quality Levels across Singapore: \n' \
                'SouthWest Singapore: ' + str(hDictionary['southWest']['PSI']) + ' (' + hDictionary['southWest']['class'] + ')' + '\n' \
                'NorthWest Singapore: ' + str(hDictionary['northWest']['PSI']) + ' (' + hDictionary['northWest']['class'] + ')' + '\n' \
                'Central Singapore: ' + str(hDictionary['central']['PSI']) + ' (' + hDictionary['central']['class'] + ')' + '\n' \
                'NorthEast Singapore: ' + str(hDictionary['northEast']['PSI']) + ' (' + hDictionary['northEast']['class'] + ')' +  '\n' \
                'SouthEast Singapore: ' + str(hDictionary['southEast']['PSI']) + ' (' + hDictionary['southWest']['class'] + ')' +  '\n\n' \
    
                '------ End of Report -----')

        if not previousdDictionary and previoushDictionary:
            previousdDictionary = dDictionary
            previoushDictionary = hDictionary
            sendEmail(message)

        if previousdDictionary and previoushDictionary:
            regionList = ['southWest', 'northWest', 'central', 'northEast', 'southEast']
            changedDDict = {}
            changedHDict = {}
            
            for region in regionList: 
                dengueInjured = dDictionary[region]['numOfInjured']
                dengueDeath = dDictionary[region]['numOfDeaths']
                psiLevel = hDictionary[region]['PSI']
                previousDengueInjured = previousdDictionary[region]['numOfInjured']
                previousDengueDeath = previousdDictionary[region]['numOfDeaths']
                previouspsiLevel = previoushDictionary[region]['PSI']

                changedDengueInjured = (dengueInjured/previousDengueInjured) * 100 
                changedDengueDeath = (dengueDeath/previousDengueDeath) * 100
                changedPsiLevel = (psiLevel/previouspsiLevel) * 100 

                changedDDict[region] = {'changedInjured':changedDengueInjured,'changedDeath':changedDengueDeath} 
                changedHDict[region] = {'changedPSI':changedPsiLevel}

                message = ('Dear Prime Minister Sir, the summary report of haze and dengue details are as follows:\n\n\n\n' + \

                    '----- Dengue Report -----\n\n\n' + \

                    'Dengue Zones Alert Levels across Singapore: \n\n' \
                    'Southwest Singapore: ' + dDictionary['southWest']['class'] + '\n' \
                    'Northwest Singapore: ' + dDictionary['northWest']['class'] + '\n' \
                    'Central Singapore: ' + dDictionary['central']['class'] + '\n' \
                    'Northeast Singapore: ' + dDictionary['northEast']['class'] + '\n' \
                    'Southeast Singapore: ' + dDictionary['southEast']['class'] + '\n\n' \

                    'Number of people infected with dengue across Singapore: \n\n' \
                    'Southwest Singapore: ' + str(dDictionary['southWest']['numOfInjured']) + '\n' \
                    'Northwest Singapore: ' + str(dDictionary['northWest']['numOfInjured']) + '\n' \
                    'Central Singapore: ' + str(dDictionary['central']['numOfInjured']) + '\n' \
                    'Northeast Singapore: ' + str(dDictionary['northEast']['numOfInjured']) + '\n' \
                    'Southeast Singapore: ' + str(dDictionary['southeast']['numOfInjured']) + '\n\n' \

                    'Change in number of dengue-related deaths across Singapore: \n\n ' \
                    'Southwest Singapore: ' + str(changedDDict['southWest']['changedInjured']) + '% \n' \
                    'Northwest Singapore: ' + str(changedDDict['northWest']['changedInjured']) + '% \n' \
                    'Central Singapore: ' + str(changedDDict['central']['changedInjured']) + '% \n' \
                    'Northeast Singapore: ' + str(changedDDict['northEast']['changedInjured']) + '% \n' \
                    'Southeast Singapore: ' + str(changedDDict['southEast']['changedInjured']) + '% \n\n' \
        
                    'Number of dengue-related deaths across Singapore: \n\n' \
                    'Southwest Singapore: ' + str(dDictionary['southWest']['numOfDeaths']) + '\n' \
                    'Northwest Singapore: ' + str(dDictionary['northWest']['numOfDeaths']) + '\n' \
                    'Central Singapore: ' + str(dDictionary['central']['numOfDeaths']) + '\n' \
                    'Northeast Singapore: ' + str(dDictionary['northEast']['numOfDeaths']) + '\n' \
                    'Southeast Singapore: ' + str(dDictionary['southEast']['numOfDeaths']) + '\n\n' \

                    'Change in number of people infected with dengue across Singapore: \n\n ' \
                    'Southwest Singapore: ' + str(changedDDict['southWest']['changedDeath']) + '% \n' \
                    'Northwest Singapore: ' + str(changedDDict['northWest']['changedDeath']) + '% \n' \
                    'Central Singapore: ' + str(changedDDict['central']['changedDeath']) + '% \n' \
                    'Northeast Singapore: ' + str(changedDDict['northEast']['changedDeath']) + '% \n' \
                    'Southeast Singapore: ' + str(changedDDict['southEast']['changedDeath']) + '% \n\n' \
    
                    '----- Haze Report -----\n\n\n' \
        
                    'PSI Levels and Air Quality Levels across Singapore: \n\n' \
                    'SouthWest Singapore: ' + str(hDictionary['southWest']['PSI']) + ' (' + hDictionary['southWest']['class'] + ')' + '\n' \
                    'NorthWest Singapore: ' + str(hDictionary['northWest']['PSI']) + ' (' + hDictionary['northWest']['class'] + ')' + '\n' \
                    'Central Singapore: ' + str(hDictionary['central']['PSI']) + ' (' + hDictionary['central']['class'] + ')' + '\n' \
                    'NorthEast Singapore: ' + str(hDictionary['northEast']['PSI']) + ' (' + hDictionary['northEast']['class'] + ')' +  '\n' \
                    'SouthEast Singapore: ' + str(hDictionary['southEast']['PSI']) + ' (' + hDictionary['southWest']['class'] + ')' +  '\n\n' \

                    'Change in number of people infected with dengue across Singapore: \n\n ' \
                    'Southwest Singapore: ' + str(changedHDict['southWest']['changedPSI']) + '% \n' \
                    'Northwest Singapore: ' + str(changedHDict['northWest']['changedPSI']) + '% \n' \
                    'Central Singapore: ' + str(changedHDict['central']['changedPSI']) + '% \n' \
                    'Northeast Singapore: ' + str(changedHDict['northEast']['changedPSI']) + '% \n' \
                    'Southeast Singapore: ' + str(changedHDict['southEast']['changedPSI']) + '% \n\n' \
    
                    '------ End of Report -----')
                
                sendEmail(message)

            time.sleep(1800)

    

    
        



        




