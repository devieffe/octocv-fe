from django.core import signing
from django.core.mail import send_mail
from django.conf import settings
import os
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.apps import apps
from django.db import transaction
from django.db.models import Q

SERVER_URL = os.getenv('SERVER_URL')

def generate_email_verification_token(user):
    return signing.dumps({'user_id': user.id})

def verify_email_token(token):
    try:
        data = signing.loads(token, max_age=60*60*2)  # token lifetime 2h
        return data['user_id']
    except signing.BadSignature:
        return None

def send_verification_email(user, target_email=None):
    if target_email:
        token = generate_email_change_token(user, target_email)
        path = reverse('confirm-email-change')
        verify_url = f"{SERVER_URL.rstrip('/')}{path}?token={token}"
        recipient = target_email
    else:
        token = generate_email_verification_token(user)
        path = reverse('verify-email')
        verify_url = f"{SERVER_URL.rstrip('/')}{path}?token={token}"
        recipient = user.email

    send_mail(
        subject='OctoCV email confirmation',
        message=f'Click the link to confirm your email: {verify_url}',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[recipient],
    )
    return (verify_url) # FOR TESTING PURPOSES ONLY !!!
    return None

def send_password_reset_email(user):
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)

    path = reverse('reset-password-confirm', kwargs={
        'uidb64': uid,
        'token': token
    })

    reset_url = f"{SERVER_URL.rstrip('/')}{path}"

    send_mail(
        subject='OctoCV password reset',
        message=f'Click the link to reset your password: {reset_url}',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
    )
    return (reset_url) # FOR TESTING PURPOSES ONLY !!!
    return None

def generate_email_change_token(user, new_email):
    # Generate a token to confirm the change of email
    return signing.dumps({'user_id': user.id, 'new_email': new_email})

def verify_email_change_token(token):
    User = get_user_model()
    try:
        data = signing.loads(token, max_age=60 * 60 * 24)  # valid for 24h
        user = User.objects.get(id=data['user_id'])
        return user, data['new_email']
    except (signing.BadSignature, User.DoesNotExist):
        # Return None if the token is invalid
        return None, None

# Calculating a score from the number of correct answers
def get_grade(score):
    thresholds = [1, 3, 5, 7, 9, 10]
    for i, threshold in enumerate(thresholds):
        if score <= threshold:
            return i
    raise ValueError("Score must be between 0 and 10")

def safe_delete_user(user):
    """
    Safely deletes a user and their related data, 
    ensuring shared objects (Skills, Dates) 
    are preserved if used by other users.
    """

    # Get models
    GeneralUserInfo = apps.get_model('api', 'GeneralUserInfo')
    Certifications = apps.get_model('api', 'Certifications')
    Education = apps.get_model('api', 'Education')
    Employment = apps.get_model('api', 'Employment')
    Projects = apps.get_model('api', 'Projects')
    Skills = apps.get_model('api', 'Skills')
    Dates = apps.get_model('api', 'Dates')

    # Start a transaction to ensure atomicity
    with transaction.atomic():
        # --- Step 1: Related GeneralUserInfo ---
        general_info_qs = GeneralUserInfo.objects.filter(user=user)
        general_info_ids = list(general_info_qs.values_list('id', flat=True))

        # Gather all related skills
        all_skills = set()
        for info in general_info_qs:
            all_skills.update(info.skills.all())
            all_skills.update(info.new_skills.all())

        # Clear M2M links before deletion
        for info in general_info_qs:
            info.skills.clear()
            info.new_skills.clear()

        # --- Step 2: Delete Certifications ---
        Certifications.objects.filter(user_id=user).delete()

        # --- Step 3: Collect Dates and delete Education / Employment ---
        edu_dates = set(
            Education.objects.filter(user_id=user).values_list('graduation_date', flat=True)
        )
        emp_dates = set(
            Employment.objects.filter(user_id=user)
            .values_list('start_date', flat=True)
        ) | set(
            Employment.objects.filter(user_id=user)
            .values_list('end_date', flat=True)
        )

        Education.objects.filter(user_id=user).delete()
        Employment.objects.filter(user_id=user).delete()

        # --- Step 4: Delete or detach Projects ---
        Projects.objects.filter(user_id=user).delete()

        # --- Step 5: Delete unused Skills (exclude current user's info) ---
        for skill in all_skills:
            still_used = GeneralUserInfo.objects.filter(
                Q(skills=skill) | Q(new_skills=skill)
            ).exclude(id__in=general_info_ids).exists()
            if not still_used:
                skill.delete()

        # --- Step 6: Delete GeneralUserInfo ---
        general_info_qs.delete()

        # --- Step 7: Delete user ---
        super(user.__class__, user).delete()

        # --- Step 8: Delete unused Dates ---
        for date in Dates.objects.filter(id__in=edu_dates | emp_dates):
            still_used = (
                Education.objects.filter(graduation_date=date).exists() or
                Employment.objects.filter(start_date=date).exists() or
                Employment.objects.filter(end_date=date).exists()
            )
            if not still_used:
                date.delete()