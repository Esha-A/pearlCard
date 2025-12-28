from django.contrib import admin
from .models import TrainFare

class TrainFareAdmin(admin.ModelAdmin):
    list_display = ('id', 'route_id', 'fromZone', 'toZone', 'price')

# Register your models here.
admin.site.register(TrainFare, TrainFareAdmin)
