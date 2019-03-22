import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
import django
django.setup()
from ccs.models import Record
from django.contrib.auth.models import User

user = User.objects.get(username='ccs')

print(Record.dengue.all()[1].date)


def hazeTotalInjured():
    temp = 0

def hazeTotalDeath():
    temp = 0

def hazeDataForMap():
    temp = 0

def hazeAllData():#list of all the data
    temp = 0

def dengueTotalInjured():
    temp = 0

def dengueTotalDeath():
    temp = 0

def dengueDataForMap():#list of [postal code, numOfinjured, numOfDeath]
    temp = 0



