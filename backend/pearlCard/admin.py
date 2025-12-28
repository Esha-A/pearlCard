from django.contrib import admin
from .models import PearlCard

class PearlCardAdmin(admin.ModelAdmin):
    list_display = ('id', 'active')

# Register your models here.
admin.site.register(PearlCard, PearlCardAdmin)
