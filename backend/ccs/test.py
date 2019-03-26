# how to run this test.py file:
# run under the directory of cz3006/backend/ccs, type $python3 test.py  in command line
# otherwise error will occur
# TODO: fix this issue!!!

from django.contrib.auth.models import User
from ccs.models import Record
import django
import sys
import os
sys.path.append('..')
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()


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
        data.append([record.record_id, record.date, record.incident_location, record.incident_region, record.incident_assistance_required. record.incident_status,
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

def dengue_summary():
    all_data = dengueAllData()
    


# test function
print("print all dengue record with all data")
print(dengueAllData())
