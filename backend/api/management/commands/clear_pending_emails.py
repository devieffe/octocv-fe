from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from api.models import PendingEmailChange

class Command(BaseCommand):
    help = 'Delete expired pending email change requests.'

    def handle(self, *args, **kwargs):
        cutoff = timezone.now() - timedelta(hours=24)
        deleted, _ = PendingEmailChange.objects.filter(created_at__lt=cutoff).delete()
        self.stdout.write(f"Deleted {deleted} expired pending email changes.")