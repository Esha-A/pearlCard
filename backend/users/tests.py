from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
from .models import User
from django.test import TestCase
from rest_framework.test import APITestCase

# Create your tests here.

class UserModelTest(TestCase):
    def test_user_creation_user_role(self):
        user = User.objects.create(name="Test User", role="USER")
        self.assertEqual(user.name, "Test User")
        self.assertEqual(user.role, "USER")

    def test_user_creation_admin_role(self):
        user = User.objects.create(name="Admin User", role="ADMIN")
        self.assertEqual(user.name, "Admin User")
        self.assertEqual(user.role, "ADMIN")

    def test_user_str(self):
        user = User(name="Test User", role="USER")
        # Don't call save(), so no PearlCard is auto-created
        expected = f"Test User (USER) (No PearlCard)"
        self.assertEqual(str(user), expected)

    def test_user_creation_missing_name_raises_error(self):
        with self.assertRaises(Exception):
            User.objects.create(role=Role.USER)

class UserViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(name="Test User", role="USER")

    def test_all_user_list_admin_required(self):
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_all_user_list_as_admin(self):
        admin_user = User.objects.create(name="Admin User", role="ADMIN")
        self.client.force_authenticate(user=admin_user)
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(any(u['id'] == self.user.id for u in response.data))
