from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Record


class HazeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Record
        fields = ('record_id', 'date', 'incident_location', 'incident_region', 'incident_type',
                  'incident_assistance_required', 'incident_status', 'number_of_injured', 'number_of_death')


class DengueSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Record
        fields = ('record_id', 'date', 'incident_location', 'incident_region', 'incident_type',
                  'incident_assistance_required', 'incident_status', 'number_of_injured', 'number_of_death')


class AllSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Record
        fields = ('record_id', 'date', 'incident_location', 'incident_region', 'incident_type',
                  'incident_assistance_required', 'incident_status', 'number_of_injured', 'number_of_death')

class HazePendingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Record
        fields = ('record_id', 'date', 'incident_location', 'incident_region', 'incident_type',
                  'incident_assistance_required', 'incident_status', 'number_of_injured', 'number_of_death')
class HazeResolvedSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Record
        fields = ('record_id', 'date', 'incident_location', 'incident_region', 'incident_type',
                  'incident_assistance_required', 'incident_status', 'number_of_injured', 'number_of_death')


class DenguePendingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Record
        fields = ('record_id', 'date', 'incident_location', 'incident_region', 'incident_type',
                  'incident_assistance_required', 'incident_status', 'number_of_injured', 'number_of_death')
class DengueResolvedSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Record
        fields = ('record_id', 'date', 'incident_location', 'incident_region', 'incident_type',
                  'incident_assistance_required', 'incident_status', 'number_of_injured', 'number_of_death')



class AllPendingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Record
        fields = ('record_id', 'date', 'incident_location', 'incident_region', 'incident_type',
                  'incident_assistance_required', 'incident_status', 'number_of_injured', 'number_of_death')
class AllResolvedSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Record
        fields = ('record_id', 'date', 'incident_location', 'incident_region', 'incident_type',
                  'incident_assistance_required', 'incident_status', 'number_of_injured', 'number_of_death')