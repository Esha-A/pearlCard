from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .serializers import TrainFareSerializer
from .models import TrainFare
from users.permissions import IsRoleAdmin

# Create your views here.

class TrainFareView(viewsets.ModelViewSet):
    serializer_class = TrainFareSerializer
    queryset = TrainFare.objects.all()
    permission_classes = [IsRoleAdmin]