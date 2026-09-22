from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth import get_user_model
from api.models import UserProfile

class Command(BaseCommand):
    help = 'Removes users who have not confirmed their email within 2 hours'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        cutoff = timezone.now() - timedelta(hours=2)

        # We will find profiles with unconfirmed emails linked to users registered before cutoff
        unverified_profiles = UserProfile.objects.filter(
            is_email_verified=False,
            user__date_joined__lt=cutoff
        )

        count = unverified_profiles.count()

        # Let's remove associated users
        for profile in unverified_profiles:
            profile.user.delete()

        self.stdout.write(self.style.SUCCESS(f'{count} unverified users removed.'))