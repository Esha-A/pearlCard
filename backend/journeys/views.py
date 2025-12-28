from django.shortcuts import get_object_or_404
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, date
from .serializers import JourneySerializer
from .models import Journey
from users.permissions import IsRoleAdmin

# Create your views here.

class AllJourneyView(viewsets.ModelViewSet):
    serializer_class = JourneySerializer  
    queryset = Journey.objects.all()
    permission_classes = [IsRoleAdmin]


class UserJourneyView(viewsets.ModelViewSet):
    serializer_class = JourneySerializer

    def get_queryset(self):
        # Validate that the user exists
        return Journey.objects.filter(
            user_id=self.kwargs['user_id']
        ).select_related('user', 'route')

    def _enforce_journey_limit(self, user_id, timestamp, exclude_journey_id=None):
        if timestamp:
            try:
                dt = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
                journey_date = dt.date()
            except Exception:
                journey_date = date.today()
        else:
            journey_date = date.today()
        
        qs = Journey.objects.filter(user_id=user_id, timestamp__date=journey_date)
        
        if exclude_journey_id:
            qs = qs.exclude(id=exclude_journey_id)
        if qs.count() > 20:
            return False, journey_date
        
        return True, journey_date

    def update(self, request, *args, **kwargs):
        # Enforce journey limit on update
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data.copy()
        user_id = data.get('user', instance.user_id)
        timestamp = data.get('timestamp', instance.timestamp.isoformat())
        ok, journey_date = self._enforce_journey_limit(user_id, timestamp, exclude_journey_id=instance.id)
        if not ok:
            return Response(
                {"detail": f"Maximum of 20 journeys per user for {journey_date.strftime('%d-%m-%Y')} reached."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        # Enforce journey limit on partial update
        instance = self.get_object()
        data = request.data.copy()
        user_id = data.get('user', instance.user_id)
        timestamp = data.get('timestamp', instance.timestamp.isoformat())
        ok, journey_date = self._enforce_journey_limit(user_id, timestamp, exclude_journey_id=instance.id)
        if not ok:
            return Response(
                {"detail": f"Maximum of 20 journeys per user for {journey_date.strftime('%d-%m-%Y')} reached."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().partial_update(request, *args, **kwargs)

    def create(self, request, user_id=None, *args, **kwargs):
        # Ensure the journey is created for the user in the URL
        data = request.data.copy()
        data['user'] = user_id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        # Use helper to enforce journey limit
        timestamp = data.get('timestamp')
        ok, journey_date = self._enforce_journey_limit(user_id, timestamp)
        if not ok:
            return Response(
                {"detail": f"Maximum of 20 journeys per user for {journey_date.strftime('%d-%m-%Y')} reached."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=201, headers=headers)