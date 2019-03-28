from django.shortcuts import render
from rest_framework import viewsets
from .models import Record
from .serializers import DengueSerializer, DenguePendingSerializer, DengueResolvedSerializer, HazeSerializer, HazePendingSerializer, HazeResolvedSerializer, AllSerializer, AllPendingSerializer, AllResolvedSerializer

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


class denguePendingViewsetManager(viewsets.ModelViewSet):
    queryset = Record.objects.filter(
        incident_type='dengue').filter(incident_status='pending')
    serializer_class = DenguePendingSerializer


class dengueResolvedViewsetManager(viewsets.ModelViewSet):
    queryset = Record.objects.filter(
        incident_type='dengue').filter(incident_status='resolved')
    serializer_class = DengueResolvedSerializer


class hazePendingViewsetManager(viewsets.ModelViewSet):
    queryset = Record.objects.filter(
        incident_type='haze').filter(incident_status='pending')
    serializer_class = HazePendingSerializer


class hazeResolvedViewsetManager(viewsets.ModelViewSet):
    queryset = Record.objects.filter(
        incident_type='haze').filter(incident_status='resolved')
    serializer_class = HazeResolvedSerializer


class allPendingViewsetManager(viewsets.ModelViewSet):
    queryset = Record.objects.filter(incident_status='pending')
    serializer_class = AllPendingSerializer


class allResolvedViewsetManager(viewsets.ModelViewSet):
    queryset = Record.objects.filter(incident_status='resolved')
    serializer_class = AllResolvedSerializer
