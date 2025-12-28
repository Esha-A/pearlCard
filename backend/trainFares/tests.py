from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
from .models import TrainFare
from django.test import TestCase
from rest_framework.test import APITestCase
from users.models import User
from pearlCard.models import PearlCard

# Create your tests here.

class TrainFareModelTest(TestCase):
	def test_trainfare_creation_sets_route_id(self):
		fare = TrainFare.objects.create(fromZone=1, toZone=2, price=2.50)
		self.assertEqual(fare.route_id, "1-2")
		self.assertEqual(fare.price, 2.50)

	def test_trainfare_unique_constraint(self):
		TrainFare.objects.create(fromZone=1, toZone=2, price=2.50)
		with self.assertRaises(Exception):
			TrainFare.objects.create(fromZone=1, toZone=2, price=3.00)

class TrainFareViewTest(APITestCase):
	def setUp(self):
		self.client = APIClient()
		self.fare = TrainFare.objects.create(fromZone=1, toZone=2, price=2.50)

	def test_trainfare_list_admin_required(self):
		url = reverse('trainFare-list')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

	def test_trainfare_list_as_admin(self):
		# Create a mock admin user and force authenticate
		pearl_card = PearlCard.objects.create(active=True)
		admin_user = User.objects.create(name="Admin User", role="ADMIN", pearlCard=pearl_card)
		self.client.force_authenticate(user=admin_user)
		url = reverse('trainFare-list')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertTrue(any(f['id'] == self.fare.id for f in response.data))

