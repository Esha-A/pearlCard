from django.db import models
from .roles import Role
from pearlCard.models import PearlCard

# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)
    role = models.CharField(
        max_length=5,
        choices=Role.choices,
        default=Role.USER
    )

    pearlCard = models.OneToOneField(
        PearlCard,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="user"
    )


    def save(self, *args, **kwargs):
        if self.pearlCard is None:
            pearl_card = PearlCard.objects.create(active=True)
            self.pearlCard = pearl_card
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.role}) ({self.pearlCard.id if self.pearlCard else 'No PearlCard'})"
