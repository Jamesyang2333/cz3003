from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
import time
from ccs.test import allAssistance, dengueSummaryByRegion, hazeSummaryByRegion, dengueAllData, hazeAllData
from backend.sms import sendSMS
from backend.facebook import postFacebook
from backend.email_helper import sendEmail
from backend.telegram import postTelegram
from backend.guidelines import postGuidelines
from backend.models import Guideline

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

# previousPostDengueList = [] #declare outside as global
# previousPostHazeList = [] #declare outside as global
@app.task
def facebook_manager():
    previousDengueDictionary = {}  # declare outside as global
    previousHazeDictionary = {}  # declare outside as global

    while True:

        # retrieve classification region and level
        dengueDictionary = dengueSummaryByRegion()
        hazeDictionary = hazeSummaryByRegion()

        # retrieve all dataset from database dont need this actually
        #dengueList = dengueAllData
        #hazeList = hazeAllData

        # if no previous dengue data to compare, just post(usually for 1st ever run only)
        if not previousDengueDictionary:
            print("POST FACEBOOK")
            # set previousDengue dictionary to become current first(cuz we need to compare all 5 regions)
            previousDengueDictionary = dengueDictionary
            postFacebook('Dengue', dengueDictionary)
            postTelegram('Dengue', dengueDictionary)
            postGuidelines('Dengue')

        # if no previous haze data to compare, just post(usually for 1st ever run only)
        print("printing haze")
        print(previousHazeDictionary)
        if not previousHazeDictionary:
            print("POST HAZE")
            # set previousDengue dictionary to become current first(cuz we need to compare all 5 regions)
            previousHazeDictionary = hazeDictionary
            postFacebook('Haze', hazeDictionary)
            postTelegram('Haze', hazeDictionary)
            postGuidelines('Haze')

        if previousDengueDictionary or previousHazeDictionary:
            # compare previous data with current data to check for any changes. If there is a change, post facebook
            regionList = ['southWest', 'northWest',
                          'central', 'northEast', 'southEast']
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
                    dengueChanged = True

                if hazeClassification == prevHazeClass:
                    unchangedHazeRegionList.append(region)
                else:
                    hazeChanged = True

            # if there are no changes to the situation, dont update facebook
            print("hazechanged?")
            print(hazeChanged)
            print("denguechanged?")
            print(dengueChanged)
            # else update facebook
            if(dengueChanged == True):
                # set previousDengue dictionary to become current first(cuz we need to compare all 5 regions)
                previousDengueDictionary = dengueDictionary.copy()
                for region in unchangedDengueRegionList:
                    del dengueDictionary[region]
                postFacebook('Dengue', dengueDictionary)
                postTelegram('Dengue', dengueDictionary)
                postGuidelines('Dengue')

            if (hazeChanged == True):
                # set previousDengue dictionary to become current first(cuz we need to compare all 5 regions)
                previousHazeDictionary = hazeDictionary.copy()
                for region in unchangedHazeRegionList:
                    del hazeDictionary[region]
                postFacebook('Haze', hazeDictionary)
                postTelegram('Haze', hazeDictionary)
                postGuidelines('Haze')

        time.sleep(5)


@app.task
def startupGuidelineDatabase():
    # '•' == '\u2022' #bullet point

    # This will only initialize the database if a member's database does not have the data, so we need to check first:
    data = Guideline.objects.all()
    if data.exists():
        print("Data exists in Guideline Database. Exiting startupGuidelineDatabase")
        return
    print("Starting Guideline Database Initialization")
    object1 = Guideline(incident_type='Dengue', guideline_type='prevention', text='Prevent Dengue: here\'s how:'+'\n\u2022 Use insecticide sprays in dark corners (under the bed, sofa and behind curtains) and burn repellent oils inside your home'+'\n\u2022 Turn over all water storage containers when empty and store them under a shelter'+'\n\u2022 Cover bamboo pole holders when not in use'+'\n\u2022 Loosen soil in potted plants to prevent accumulation of stagnant water on surface' +
                        '\n\nAlternate Days:'+'\n\u2022 Change water in vases/bowls' +
                        '\n\u2022 Remove water from flower/plant pot plates'
                        + '\n\nWeekly: ' + '\n\u2022 Clear fallen leaves and stagnant water in scupper drains and in the garden' +
                        '\n\u2022 Clear any stagnant water in air cooler units'
                        + '\n\nMonthly: ' + '\n\u2022 Clear fallen leaves and other blockages in roof gutters'+'\n\u2022 Use sand granular insecticide in gully traps and roof gutters')
    object1.save()
    object1 = Guideline(incident_type='Dengue', guideline_type='symptoms', text='Most people infected have mild or no symptoms. About 1 in 4 people infected with dengue will get sick. Mild symptoms of dengue may be confused with other illnesses that cause fever and flu-like illness. Most people will recover after about one week.\n' +
                        '\nThe most common symptoms are fever and one or more of the following: '+'\n\u2022 Headache'+'\n\u2022 Eye Pain(typically behind the eyes)'+'\n\u2022 Muscle, joint, or bone pain'+'\n\u2022 Rash'+'\n\u2022 Nausea and vomiting'+'\n\u2022 Unusual bleeding (nose or gum bleed, small red spots under the skin, or unusual bruising)')
    object1.save()
    object1 = Guideline(incident_type='Dengue', guideline_type='advice',
                        text='Please be advised to always use a mosquito repellent spray to prevent mosquito bites.')
    object1.save()

    object1 = Guideline(incident_type='Haze', guideline_type='prevention', text='7 Ways to protect yourself from the Haze: ' +
                                                                                '\n\n\u2022 Stay Indoors' + '\nClearly one of the best ways to battle the health effects of haze is to avoid going outdoors. Try to stay indoors as much as possible and shut the windows. Switch on the air conditioner if possible or use suitable air filters and air purifiers to remove dust particles and contaminants in the air.' +
                                                                                '\n\n\u2022 Avoid Strenuous Outdoor Activities' + '\nMinimise your duration of exposure outdoors. If you have to do outdoor sports or exercises, try bringing your workout indoors or postpone it instead. Aerobic activities such as running, cycling or playing football will require deep breathing and that would mean inhaling all the harmful pollutants in the air. Those who have pre-existing chronic heart or lung conditions, or who are not feeling well, should avoid going outdoors. Even if you do not have a pre-existing condition, it is still better to be safe than sorry as excessive exposure to the minuscule dust particles can increase one’s risk of developing viral and bacterial infections.' +
                                                                                '\n\n\u2022 Wear A Mask' + '\nIf you must go outdoors, put on a respiratory mask. Surgical masks or paper masks do not offer any protection against the solid particles present in the air. An appropriate respiratory mask to combat the haze would be the N95 mask, which is designed to filter airborne particles and protect wearers from inhaling the haze particles. These respiratory masks are available at major pharmacies and supermarkets.' +
                                                                                '\n\n\u2022 Hydrate Frequently And Increase Fibre Intake' + '\nGiven that haze can irritate your throat, causing it to be dry or sore or even lead to coughing, it is essential to drink up to flush away the toxins absorbed through the skin and lungs. Eating more fruits and vegetables that are rich in vitamins A and C can boost your immune system. Foods rich in vitamin A include carrots, sweet potatoes and spinach and are known to protect your eyes and lungs from air pollution. Foods rich in vitamin C like oranges, kiwis and broccoli can promote lung tissue health and prevent you from catching the common flu.' +
                                                                                '\n\n\u2022 Take Medication To Alleviate Symptoms'+'\nHaze can cause some adverse effects on your health which includes eye irritation, running or stuffy nose, throat irritation, headache or lung inflammation. If you experience any of these symptoms, you might want to relieve them with eye drops or cough tablets and mixtures available at pharmacies (consult your doctor first). If your symptoms worsen, do seek medical attention immediately.')
    object1.save()
    object1 = Guideline(incident_type='Haze', guideline_type='symptoms', text='Acute exposure to the haze can harm the nose, lungs and eyes in otherwise healthy children and result in the following symptoms:' +
                                                                              '\n\u2022 Itchy, watery or red eyes' +
                                                                              '\n\u2022 Runny nose' +
                                                                              '\n\u2022 Blocked nose' +
                                                                              '\n\u2022 Dry/sore throat' +
                                                                              '\n\u2022 Dry irritant cough' +
                                                                              '\n\u2022 Breathing difficulty' +
                                                                              '\n\u2022 Reduced tolerance to exercise')
    object1.save()
    object1 = Guideline(incident_type='Haze', guideline_type='advice',
                        text='Please limit yourself to 30 minutes of outdoor activities when PSI Levels are above 100 and remain indoors at all times when PSI Levels are above 300.')
    object1.save()
    print("Finished initializing Guideline Database")
    print(Guideline.objects.all())


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
    print("hhh")
    while True:

        dDictionary = dengueSummaryByRegion()
        hDictionary = hazeSummaryByRegion()

        sumDengue1 = sum(d['numOfInjured'] for d in dDictionary.values())
        sumDengue2 = sum(d['numOfDeaths'] for d in dDictionary.values())
        averagePSI = sum(d['PSI'] for d in hDictionary.values()) / 5

        message = ('Dear Prime Minister Sir, the summary report of haze and dengue details are as follows:\n\n\n\n' +

                   '----- Dengue Report -----\n\n\n' +

                   'Dengue Zones Alert Levels across Singapore: \n\n'
                   'Southwest Singapore: ' +
                   dDictionary['southWest']['class'] + '\n'
                   'Northwest Singapore: ' +
                   dDictionary['northWest']['class'] + '\n'
                   'Central Singapore: ' +
                   dDictionary['central']['class'] + '\n'
                   'Northeast Singapore: ' +
                   dDictionary['northEast']['class'] + '\n'
                   'Southeast Singapore: ' +
                   dDictionary['southEast']['class'] + '\n\n'

                   'Number of dengue-related infections across Singapore: \n\n'
                   'Southwest Singapore: ' +
                   str(dDictionary['southWest']['numOfInjured']) + '\n'
                   'Northwest Singapore: ' +
                   str(dDictionary['northWest']['numOfInjured']) + '\n'
                   'Central Singapore: ' +
                   str(dDictionary['central']['numOfInjured']) + '\n'
                   'Northeast Singapore: ' +
                   str(dDictionary['northEast']['numOfInjured']) + '\n'
                   'Southeast Singapore: ' +
                   str(dDictionary['southEast']['numOfInjured']) + '\n\n'

                   'Total number of dengue-related infections in Singapore: ' +
                   str(sumDengue1) + '\n\n'

                   'Number of dengue-related deaths across Singapore: \n\n'

                   'Southwest Singapore: ' +
                   str(dDictionary['southWest']['numOfDeaths']) + '\n'
                   'Northwest Singapore: ' +
                   str(dDictionary['northWest']['numOfDeaths']) + '\n'
                   'Central Singapore: ' +
                   str(dDictionary['central']['numOfDeaths']) + '\n'
                   'Northeast Singapore: ' +
                   str(dDictionary['northEast']['numOfDeaths']) + '\n'
                   'Southeast Singapore: ' +
                   str(dDictionary['southEast']['numOfDeaths']) + '\n\n'

                   'Total number of dengue-realted deaths in Singapore: ' +
                   str(sumDengue2) + '\n\n\n'

                   '----- Haze Report -----\n\n'

                   'PSI Levels and Air Quality Levels across Singapore: \n'
                   'SouthWest Singapore: ' +
                   str(hDictionary['southWest']['PSI']) + ' (' +
                   hDictionary['southWest']['class'] + ')' + '\n'
                   'NorthWest Singapore: ' +
                   str(hDictionary['northWest']['PSI']) + ' (' +
                   hDictionary['northWest']['class'] + ')' + '\n'
                   'Central Singapore: ' +
                   str(hDictionary['central']['PSI']) + ' (' +
                   hDictionary['central']['class'] + ')' + '\n'
                   'NorthEast Singapore: ' +
                   str(hDictionary['northEast']['PSI']) + ' (' +
                   hDictionary['northEast']['class'] + ')' + '\n'
                   'SouthEast Singapore: ' +
                   str(hDictionary['southEast']['PSI']) + ' (' +
                   hDictionary['southWest']['class'] + ')' + '\n\n'

                   'Average PSI Levels and Air Quality Levels in Singapore: ' +
                   str(averagePSI) + '\n\n\n'

                   '------ End of Report -----')

        if not (previousdDictionary and previoushDictionary):
            print("first time")
            previousdDictionary = dDictionary
            previoushDictionary = hDictionary
            sendEmail(message)

        else:
            print("not first time")
            regionList = ['southWest', 'northWest',
                          'central', 'northEast', 'southEast']
            changedDDict = {}
            changedHDict = {}

            for region in regionList:
                dengueInjured = dDictionary[region]['numOfInjured']
                dengueDeath = dDictionary[region]['numOfDeaths']
                psiLevel = hDictionary[region]['PSI']
                previousDengueInjured = previousdDictionary[region]['numOfInjured']
                previousDengueDeath = previousdDictionary[region]['numOfDeaths']
                previouspsiLevel = previoushDictionary[region]['PSI']

                changedDDict[region] = {'changedInjured': dengueInjured -
                                        previousDengueInjured, 'changedDeath': dengueDeath - previousDengueDeath}
                changedHDict[region] = {
                    'changedPSI': psiLevel - previouspsiLevel}

                changeDengue1 = sum(d['changedInjured']
                                    for d in changedDDict.values())
                changeDengue2 = sum(d['changedDeath']
                                    for d in changedDDict.values())

            message = ('Dear Prime Minister Sir, the summary report of haze and dengue details are as follows:\n\n\n\n' +

                       '----- Dengue Report -----\n\n\n' +

                       'Dengue Zones Alert Levels across Singapore: \n\n'
                       'Southwest Singapore: ' +
                       dDictionary['southWest']['class'] + '\n'
                       'Northwest Singapore: ' +
                       dDictionary['northWest']['class'] + '\n'
                       'Central Singapore: ' +
                       dDictionary['central']['class'] + '\n'
                       'Northeast Singapore: ' +
                       dDictionary['northEast']['class'] + '\n'
                       'Southeast Singapore: ' +
                       dDictionary['southEast']['class'] + '\n\n'

                       'Number of dengue-related infections across Singapore: \n\n'
                       'Southwest Singapore: ' +
                       str(dDictionary['southWest']['numOfInjured']) + '\n'
                       'Northwest Singapore: ' +
                       str(dDictionary['northWest']['numOfInjured']) + '\n'
                       'Central Singapore: ' +
                       str(dDictionary['central']['numOfInjured']) + '\n'
                       'Northeast Singapore: ' +
                       str(dDictionary['northEast']['numOfInjured']) + '\n'
                       'Southeast Singapore: ' +
                       str(dDictionary['southEast']['numOfInjured']) + '\n\n'

                       'Total number of dengue-related infections across Singapore: ' +
                       str(sumDengue1) + '\n\n'

                       'Change in number of dengue-related infections across Singapore: \n\n'
                       'Southwest Singapore: ' +
                       str(changedDDict['southWest']['changedInjured']) + ' \n'
                       'Northwest Singapore: ' +
                       str(changedDDict['northWest']['changedInjured']) + ' \n'
                       'Central Singapore: ' +
                       str(changedDDict['central']['changedInjured']) + ' \n'
                       'Northeast Singapore: ' +
                       str(changedDDict['northEast']['changedInjured']) + ' \n'
                       'Southeast Singapore: ' +
                       str(changedDDict['southEast']
                           ['changedInjured']) + ' \n\n'

                       'Total change in number of dengue-related infections across Singapore: ' +
                       str(changeDengue1) + '\n\n'

                       'Number of dengue-related deaths across Singapore: \n\n'
                       'Southwest Singapore: ' +
                       str(dDictionary['southWest']['numOfDeaths']) + '\n'
                       'Northwest Singapore: ' +
                       str(dDictionary['northWest']['numOfDeaths']) + '\n'
                       'Central Singapore: ' +
                       str(dDictionary['central']['numOfDeaths']) + '\n'
                       'Northeast Singapore: ' +
                       str(dDictionary['northEast']['numOfDeaths']) + '\n'
                       'Southeast Singapore: ' +
                       str(dDictionary['southEast']['numOfDeaths']) + '\n\n'

                       'Total number of dengue-related deaths in Singapore: ' +
                       str(sumDengue2) + '\n\n'

                       'Change in number of dengue-related deaths across Singapore: \n\n'

                       'Southwest Singapore: ' +
                       str(changedDDict['southWest']['changedDeath']) + ' \n'
                       'Northwest Singapore: ' +
                       str(changedDDict['northWest']['changedDeath']) + ' \n'
                       'Central Singapore: ' +
                       str(changedDDict['central']['changedDeath']) + ' \n'
                       'Northeast Singapore: ' +
                       str(changedDDict['northEast']['changedDeath']) + ' \n'
                       'Southeast Singapore: ' +
                       str(changedDDict['southEast']['changedDeath']) + ' \n\n'

                       'Total change in number of dengue-related deaths in Singapore: ' +
                       str(changeDengue2) + '\n\n'

                       '----- Haze Report -----\n\n\n'

                       'PSI Levels and Air Quality Levels across Singapore: \n\n'
                       'SouthWest Singapore: ' +
                       str(hDictionary['southWest']['PSI']) + ' (' +
                       hDictionary['southWest']['class'] + ')' + '\n'
                       'NorthWest Singapore: ' +
                       str(hDictionary['northWest']['PSI']) + ' (' +
                       hDictionary['northWest']['class'] + ')' + '\n'
                       'Central Singapore: ' +
                       str(hDictionary['central']['PSI']) + ' (' +
                       hDictionary['central']['class'] + ')' + '\n'
                       'NorthEast Singapore: ' +
                       str(hDictionary['northEast']['PSI']) + ' (' +
                       hDictionary['northEast']['class'] + ')' + '\n'
                       'SouthEast Singapore: ' +
                       str(hDictionary['southEast']['PSI']) + ' (' +
                       hDictionary['southEast']['class'] + ')' + '\n\n'

                       'Average PSI Levsl and Air Quality Levels across Singapore: ' +
                       str(averagePSI) + '\n\n'


                       'Change in PSI Levels across Singapore: \n\n'

                       'Southwest Singapore: ' +
                       str(changedHDict['southWest']['changedPSI']) + ' \n'
                       'Northwest Singapore: ' +
                       str(changedHDict['northWest']['changedPSI']) + ' \n'
                       'Central Singapore: ' +
                       str(changedHDict['central']['changedPSI']) + ' \n'
                       'Northeast Singapore: ' +
                       str(changedHDict['northEast']['changedPSI']) + ' \n'
                       'Southeast Singapore: ' +
                       str(changedHDict['southEast']['changedPSI']) + ' \n\n\n'


                       '------ End of Report -----')

            previousdDictionary = dDictionary
            previoushDictionary = hDictionary
            sendEmail(message)

        time.sleep(420)
