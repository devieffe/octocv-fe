from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model
from api.models import GeneralUserInfo

User = get_user_model()

@receiver(post_save, sender=User)
def ensure_view_permissions_for_staff(sender, instance, **kwargs):
    if instance.is_staff and not instance.is_superuser:
        models_to_grant = [User, GeneralUserInfo]
        for model in models_to_grant:
            content_type = ContentType.objects.get_for_model(model)
            codename = f'view_{model._meta.model_name}'
            try:
                permission = Permission.objects.get(
                    codename=codename,
                    content_type=content_type
                )
                if not instance.has_perm(f"{permission.content_type.app_label}.{permission.codename}"):
                    instance.user_permissions.add(permission)
            except Permission.DoesNotExist:
                pass