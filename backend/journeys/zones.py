from django.db import models

class Zone(models.IntegerChoices):
    ZONE_1 = 1, "Zone 1"
    ZONE_2 = 2, "Zone 2"
    ZONE_3 = 3, "Zone 3"
