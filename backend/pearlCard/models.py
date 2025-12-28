from django.db import models

# Create your models here.
class PearlCard(models.Model):
    id = models.AutoField(primary_key=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.id} ({self.active})"
