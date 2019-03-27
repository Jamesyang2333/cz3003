from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .model import Record


class HazeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Record
