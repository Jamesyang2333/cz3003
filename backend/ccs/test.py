# how to run this test.py file:
# run under the directory of cz3006/backend/ccs, type $python3 test.py  in command line
# otherwise error will occur
# TODO: fix this issue!!!


import django
import sys
import os
sys.path.append('..')
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()
from ccs.models import Record
import datetime


def hazeTotalInjured():
    hazeRecords = Record.haze.all()
    totalInjured = 0
    for record in hazeRecords:
        if (record.number_of_injured != None):
            totalInjured += record.number_of_injured
    return totalInjured


def hazeTotalDeath():
    hazeRecords = Record.haze.all()
    totalDeath = 0
    for record in hazeRecords:
        if (record.number_of_death != None):
            totalDeath = totalDeath + record.number_of_death
    return totalDeath


def hazeDataForMap():
    hazeRecords = Record.haze.all()
    forMapList = []
    for i in range(0, len(hazeRecords)):
        hazeList = [Record.haze.all()[i].incident_location, Record.haze.all()[i].number_of_injured,
                    Record.haze.all()[i].number_of_death]
        forMapList.append(hazeList)
    return forMapList


def hazeAllData():  # list of all the data
    hazeRecords = Record.haze.all()
    data = [['record_id', 'date', 'incident_location', 'incident_region', 'incident_assistanceRequired',
             'incident_status', 'numOfInjured', 'numOfdeaths', 'PSI', 'estimateStartingTime']]
    for record in hazeRecords:
        print(record)
        print(record)
        data.append([record.record_id, record.date, record.incident_location, record.incident_region, record.incident_assistance_required, record.incident_status,
                     record.number_of_injured, record.number_of_death, record.pollutant_standards_index, record.estimated_starting_time])
    return data



def dengueTotalInjured():
    dengueRecords = Record.dengue.all()
    totalInjured = 0
    for record in dengueRecords:
        if (record.number_of_injured != None):
            totalInjured += record.number_of_injured
    return totalInjured


def dengueTotalDeath():
    dengueRecords = Record.dengue.all()
    totalInjured = 0
    for record in dengueRecords:
        if (record.number_of_death != None):
            totalInjured += record.number_of_death
    return totalInjured


def dengueDataForMap():  # list of [postal code, numOfinjured, numOfDeath]
    dengueRecords = Record.dengue.all()
    forMapList = []
    for i in range(0, len(dengueRecords)):
        dengueList = [Record.dengue.all()[i].incident_location, Record.dengue.all()[i].number_of_injured,
                      Record.dengue.all()[i].number_of_death]
        forMapList.append(dengueList)
    return forMapList


def dengueAllData():  # list of all the data
    dengueRecords = Record.dengue.all()
    data = [['record_id', 'date', 'incident_location', 'incident_region', 'incident_assistanceRequired',
             'incident_status', 'numOfInjured', 'numOfdeaths', 'estimateStartingTime']]
    for record in dengueRecords:
        data.append([record.record_id, record.date, record.incident_location, record.incident_region, record.incident_assistance_required, record.incident_status,
                     record.number_of_injured, record.number_of_death, record.estimated_starting_time])
    return data


def dengue_summary_region(): 
    # Returns a dictionary of dictionaries
    # The first dicionary has five keys: 'southWest', 'northWest', 'central', 'northEast', 'southEast', the five regions of Singapore
    # The value associated with each key is a dictionary {'numOfInjured': XX, 'numOfDeaths': XX, 'class': XX}
    all_data = dengueAllData()
    regionList = ['southWest', 'northWest', 'central', 'northEast', 'southEast']
    summary = {}
    for r in regionList:
        summary[r] = {'numOfInjured': 0, 'numOfDeaths': 0}
    now = datetime.datetime.now(datetime.timezone.utc)
    cnt = 0
    for record in all_data:
        cnt += 1
        if cnt == 1:
            continue
        if (now - record[1]).total_seconds() <= 1814400:
            print(record[6])
            summary[record[3]]['numOfInjured'] += record[6]
            print(record[7])
            summary[record[3]]['numOfDeaths'] += record[7]
    for key in regionList:
        if (summary[key]['numOfInjured'] + summary[key]['numOfDeaths']) == 0:
            summary[key]['class'] = 'Green'
        elif (summary[key]['numOfInjured'] + summary[key]['numOfDeaths']) < 10:
            summary[key]['class'] = 'Yello'
        else:
            summary[key]['class'] = 'Red'
    return summary
    

def haze_summary_region():
    # Returns a dictionary of dictionaries
    # The first dicionary has five keys: 'southWest', 'northWest', 'central', 'northEast', 'southEast', the five regions of Singapore
    # The value associated with each key is a dictionary {'PSI: XX, class': XX}
    all_data = hazeAllData()
    regionList = ['southWest', 'northWest', 'central', 'northEast', 'southEast']
    summary = {}
    for r in regionList:
        summary[r] = {'PSI': 0}
    now = datetime.datetime.now(datetime.timezone.utc)
    cnt = 0
    for record in all_data:
        cnt += 1
        if cnt == 1:
            continue
        if (now - record[1]).total_seconds() <= 86400:
            summary[record[3]]['PSI'] = max(summary[record[3]]['PSI'], record[8])
    print(summary)
    for key in regionList:
        if summary[key]['PSI'] <= 50:
            summary[key]['class'] = 'Good'
        elif summary[key]['PSI'] <= 100:
            summary[key]['class'] = 'Moderate'
        elif summary[key]['PSI'] <= 200:
            summary[key]['class'] = 'Unhealthy'
        elif summary[key]['PSI'] <= 300:
            summary[key]['class'] = 'Very unhealthy'
        else:
            summary[key]['class'] = 'Hazardous'
    return summary


# test function
print("print all dengue record with all data")
haze = hazeAllData()
print(haze)
summary = haze_summary_region()
print(summary)
# print(len(dengue[0]))
# print(dengue[0])
# print(len(dengue[1]))
# print(dengue[1])
# now = datetime.datetime.now(datetime.timezone.utc)
# print(now)
# diff = now - dengue[1][1]
# print(type(diff))
# print(diff.total_seconds())