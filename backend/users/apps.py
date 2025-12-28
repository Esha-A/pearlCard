from django.apps import AppConfig
from django.conf import settings
from django.db import connection

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'

    def ready(self):
        # Only instantiates in development mode
        if not settings.DEBUG:
            return

        # Only run if the table exists
        if 'users_user' not in connection.introspection.table_names():
            return

        from pearlCard.models import PearlCard
        from .models import User
        # Create a PearlCard with the next available id and assign to user
        if not User.objects.filter(name='Max Mayfield', role='User').exists():
            pearl_card = PearlCard.objects.create(active=True)
            User.objects.create(name='Max Mayfield', pearlCard=pearl_card)
