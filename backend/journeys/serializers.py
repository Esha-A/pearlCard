from rest_framework import serializers
from .models import Journey
from users.models import User
from trainFares.models import TrainFare


class JourneySerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    route = serializers.SlugRelatedField(slug_field='route_id', queryset=TrainFare.objects.all())
    
    # keep a read-only view of linked user's name and pearlcard id
    username = serializers.CharField(source='user.name', read_only=True)
    pearlCardId = serializers.CharField(source='user.pearlCard.id', read_only=True)

    class Meta:
        model = Journey
        fields = ('id', 'user', 'username', 'pearlCardId', 'route', 'price', 'timestamp')