from django.shortcuts import render
from rest_framework import viewsets
from .models import Record
from .serializers import DengueSerializer, HazeSerializer, AllSerializer

# Create your views here.


class dengueViewsetManager(viewsets.ModelViewSet):
    queryset = Record.objects.filter(incident_type='dengue')
    serializer_class = DengueSerializer


class hazeViewsetManager(viewsets.ModelViewSet):
    queryset = Record.objects.filter(incident_type='haze')
    serializer_class = HazeSerializer


class allViewsetManager(viewsets.ModelViewSet):
    queryset = Record.objects.all()
    serializer_class = AllSerializer
