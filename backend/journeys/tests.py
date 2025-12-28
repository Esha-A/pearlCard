from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
from django.utils import timezone
from django.test import TestCase
from rest_framework.test import APITestCase
from users.models import User
from trainFares.models import TrainFare
from pearlCard.models import PearlCard
from .models import Journey
from django.db import IntegrityError

class JourneyViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.pearl_card = PearlCard.objects.create(active=True)
        self.user = User.objects.create(name="Test User", role="USER", pearlCard=self.pearl_card)
        self.train_fare = TrainFare.objects.create(fromZone=1, toZone=2, price=2.50)
        self.route_id = self.train_fare.route_id
        self.journey = Journey.objects.create(user=self.user, route=self.train_fare, price=2.50)

    def test_user_journey_list(self):
        url = reverse('user-journeys', kwargs={'user_id': self.user.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['user'], self.user.id)

    def test_user_journey_create(self):
        url = reverse('user-journeys', kwargs={'user_id': self.user.id})
        data = {
            'route': self.route_id,
            'timestamp': timezone.now().isoformat()
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['user'], self.user.id)
        self.assertEqual(response.data['route'], self.route_id)

    def test_user_journey_create_limit_error(self):
        url = reverse('user-journeys', kwargs={'user_id': self.user.id})
        # Create 21 journeys for the same day
        for _ in range(20):
            Journey.objects.create(user=self.user, route=self.train_fare, price=2.50, timestamp=timezone.now())
        data = {
            'route': self.route_id,
            'timestamp': timezone.now().isoformat()
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Maximum of 20 journeys', response.data['detail'])

    def test_all_journey_list_admin_required(self):
        url = reverse('journey-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)



class JourneyModelTest(TestCase):
    def setUp(self):
        self.pearl_card = PearlCard.objects.create(active=True)
        self.user = User.objects.create(name="Test User", role="USER", pearlCard=self.pearl_card)
        self.train_fare = TrainFare.objects.create(fromZone=1, toZone=2, price=2.50)

    def test_journey_creation_sets_price(self):
        journey = Journey.objects.create(user=self.user, route=self.train_fare, price=0)
        self.assertEqual(journey.price, self.train_fare.price)

    def test_journey_price_updates_on_route_change(self):
        journey = Journey.objects.create(user=self.user, route=self.train_fare, price=0)
        new_fare = TrainFare.objects.create(fromZone=2, toZone=3, price=3.75)
        journey.route = new_fare
        journey.save()
        self.assertEqual(journey.price, new_fare.price)

    def test_journey_str(self):
        journey = Journey.objects.create(user=self.user, route=self.train_fare, price=0)
        # The __str__ method uses the price as stored, which may be '2.5' not '2.50'
        expected = f"{self.user.id} - {self.train_fare.id} (${journey.price})"
        self.assertEqual(str(journey), expected)

    def test_journey_creation_missing_user_raises_error(self):
        with self.assertRaises(Exception):
            Journey.objects.create(route=self.train_fare, price=2.50)

    def test_journey_creation_missing_route_raises_error(self):
        with self.assertRaises(Exception):
            Journey.objects.create(user=self.user, price=2.50)

    def test_journey_creation_missing_price_sets_price(self):
        # If price is omitted, it should be set from the route automatically
        journey = Journey.objects.create(user=self.user, route=self.train_fare)
        self.assertEqual(journey.price, self.train_fare.price)