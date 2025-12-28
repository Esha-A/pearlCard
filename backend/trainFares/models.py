from django.db import models
from .zones import Zone

# Create your models here.
class TrainFare(models.Model):
    id = models.AutoField(primary_key=True)
    fromZone = models.IntegerField(choices=Zone.choices)
    toZone = models.IntegerField(choices=Zone.choices)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    # Composite ID for UI (e.g., "1-2")
    route_id = models.CharField(max_length=10, unique=True, editable=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['fromZone', 'toZone'], name='unique_from_to_zone')
        ]

    def save(self, *args, **kwargs):
        # Automatically generate route_id from fromZone and toZone
        self.route_id = f"{self.fromZone}-{self.toZone}"
        super().save(*args, **kwargs)

    def _str_(self):
        return f"Zone {self.fromZone} → Zone {self.toZone} (${self.price})"
