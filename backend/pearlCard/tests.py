from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
from .models import PearlCard
from django.test import TestCase
from rest_framework.test import APITestCase
from users.models import User

# Create your tests here.

class PearlCardModelTest(TestCase):
	def test_pearlcard_creation(self):
		card = PearlCard.objects.create(active=True)
		self.assertTrue(card.active)
		self.assertIsNotNone(card.id)

	def test_pearlcard_str(self):
		card = PearlCard.objects.create(active=False)
		expected = f"{card.id} (False)"
		self.assertEqual(str(card), expected)

class PearlCardViewTest(APITestCase):
	def setUp(self):
		self.client = APIClient()
		self.card = PearlCard.objects.create(active=True)

	def test_pearlcard_list_admin_required(self):
		url = reverse('pearlcard-list')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

	def test_pearlcard_list_as_admin(self):
		admin_user = User.objects.create(name="Admin User", role="ADMIN")
		self.client.force_authenticate(user=admin_user)
		url = reverse('pearlcard-list')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertTrue(any(c['id'] == self.card.id for c in response.data))
