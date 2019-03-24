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
from django.contrib.auth.models import User


def hazeTotalInjured():
    hazeRecords = Record.haze.all()
    totalInjured = 0
    for record in hazeRecords:
        if (record.key_indicator_numOfInjured!=None):
            totalInjured += record.key_indicator_numOfInjured
    return totalInjured

def hazeTotalDeath():
    hazeRecords = Record.haze.all()
    totalDeath = 0
    for record in hazeRecords:
        if (record.key_indicator_numOfdeaths!=None):
            totalDeath = totalDeath + record.key_indicator_numOfdeaths
    return totalDeath

def hazeDataForMap():
    hazeRecords = Record.haze.all()
    forMapList = []
    for i in range(0,len(hazeRecords)):
        hazeList = [Record.haze.all()[i].incident_location, Record.haze.all()[i].key_indicator_numOfInjured,
        Record.haze.all()[i].key_indicator_numOfdeaths]
        forMapList.append(hazeList)
    return forMapList

def hazeAllData():#list of all the data
    hazeRecords = Record.haze.all()
    data = [['record_id','date','incident_location','incident_assistanceRequired','incident_status','numOfInjured','numOfdeaths','estimateStartingTime']]
    for record in hazeRecords:
        data.append([record.record_id,record.date,record.incident_location,record.incident_assistanceRequired,record.incident_status ,record.key_indicator_numOfInjured,record.key_indicator_numOfdeaths,record.key_indicator_estimateStartingTime])
    return data

def dengueTotalInjured():
    dengueRecords = Record.dengue.all()
    totalInjured = 0
    for record in dengueRecords:
        if (record.key_indicator_numOfInjured!=None):
            totalInjured += record.key_indicator_numOfInjured
    return totalInjured

def dengueTotalDeath():
    dengueRecords = Record.dengue.all()
    totalInjured = 0
    for record in dengueRecords:
        if (record.key_indicator_numOfdeaths!=None):
            totalInjured += record.key_indicator_numOfdeaths
    return totalInjured

def dengueDataForMap():#list of [postal code, numOfinjured, numOfDeath]
    dengueRecords = Record.dengue.all()
    forMapList = []
    for i in range(0,len(dengueRecords)):
        dengueList = [Record.dengue.all()[i].incident_location, Record.dengue.all()[i].key_indicator_numOfInjured,
        Record.dengue.all()[i].key_indicator_numOfdeaths]
        forMapList.append(dengueList)
    return forMapList

def dengueAllData():#list of all the data
    dengueRecords = Record.dengue.all()
    data = [['record_id','date','incident_location','incident_assistanceRequired','incident_status','numOfInjured','numOfdeaths','estimateStartingTime']]
    for record in dengueRecords:
        data.append([record.record_id,record.date,record.incident_location,record.incident_assistanceRequired,record.incident_status ,record.key_indicator_numOfInjured,record.key_indicator_numOfdeaths,record.key_indicator_estimateStartingTime])
    return data


#test function
print("print all dengue record with all data")
print(dengueAllData())


