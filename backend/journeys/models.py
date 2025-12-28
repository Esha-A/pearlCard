from django.db import models
from django.utils import timezone
from users.models import User
from trainFares.models import TrainFare

class Journey(models.Model):
    id = models.AutoField(primary_key=True)

    # Foreign keys
    user = models.ForeignKey(
        'users.User', 
        to_field='id',
        on_delete=models.CASCADE, 
        related_name="journeys",
        null=False,
        blank=False,
    )
    route = models.ForeignKey(
        'trainFares.TrainFare', 
        to_field='route_id',
        on_delete=models.CASCADE, 
        related_name="journeys",
        null=False,
        blank=False,
        default=1
   )

    # Store the fare price at the time of journey
    price = models.DecimalField(max_digits=10, decimal_places=2, editable=False, null=False, blank=False)

    # Timestamp for journey creation. Use provided value if given, otherwise default to now.
    timestamp = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        # Always update price if route is set (on create or update)
        if self.route_id:
            self.price = TrainFare.objects.filter(route_id=self.route_id).values_list('price', flat=True).first()
        super().save(*args, **kwargs)


    def __str__(self):
        return f"{self.user.id} - {self.route.id} (${self.price})"