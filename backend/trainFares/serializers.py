from rest_framework import serializers
from .models import TrainFare

class TrainFareSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainFare
        fields = ('id', 'route_id', 'fromZone', 'toZone','price')