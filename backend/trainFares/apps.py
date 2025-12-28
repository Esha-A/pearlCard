from django.conf import settings
from django.apps import AppConfig
from django.db import connection

class TrainfaresConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'trainFares'

    def ready(self):
        # Only instantiates in development mode
        if not settings.DEBUG:
            return

        # Only run if the table exists
        if 'trainFares_trainfare' not in connection.introspection.table_names():
            return

        import os, json
        from .models import TrainFare
        config_path = os.path.join(os.path.dirname(__file__), 'fares.json')
        with open(config_path) as f:
            fares_to_create = json.load(f)
        for from_zone, to_zone, price in fares_to_create:
            if not TrainFare.objects.filter(fromZone=from_zone, toZone=to_zone).exists():
                TrainFare.objects.create(fromZone=from_zone, toZone=to_zone, price=price)
