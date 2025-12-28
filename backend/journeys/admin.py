from django.contrib import admin
from .models import Journey

class JourneysAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'route', 'price', 'timestamp']

# Register your models here.
admin.site.register(Journey, JourneysAdmin)
