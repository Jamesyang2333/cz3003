from django.shortcuts import render
from rest_framework import viewsets
from .models import Record

# Create your views here.


class dengueManager(viewsets.ModelViewSet):
    queryset = Record.objects.filter(incident_type='dengue')


class hazeManager(viewsets.ModelViewSet):
    queryset = Record.objects.filter(incident_type='haze')


class allManager(viewsets.ModelViewSet):
    queryset = Record.objects.all()
