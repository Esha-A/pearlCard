from rest_framework import serializers
from .models import PearlCard

class PearlCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = PearlCard
        fields = ('id', 'active')