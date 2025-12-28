from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .serializers import PearlCardSerializer
from .models import PearlCard
from users.permissions import IsRoleAdmin

# Create your views here.

class AllPearlCardView(viewsets.ModelViewSet):
    serializer_class = PearlCardSerializer
    queryset = PearlCard.objects.all()
    permission_classes = [IsRoleAdmin]