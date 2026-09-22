from django.core.management.base import BaseCommand
from django.db.models import ProtectedError
from api.models import Dates

"""
This function should always return "Removed 0 unused dates", 
because if the program is working correctly, 
unused dates should be removed automatically.
"""

class Command(BaseCommand):
    help = "Removes unused Dates objects"

    def handle(self, *args, **kwargs):
        count = 0
        for date in Dates.objects.all():
            related_objects = [
                date.graduation_date.all(),
                date.start_date.all(),
                date.end_date.all()
            ]

            if all(not qs.exists() for qs in related_objects):
                try:
                    date.delete()
                    count += 1
                except ProtectedError:
                    continue
        
        self.stdout.write(self.style.SUCCESS(f"Removed {count} unused dates."))