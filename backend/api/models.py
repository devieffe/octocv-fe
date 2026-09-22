from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from django.utils import timezone
from datetime import timedelta
from django.core.exceptions import ValidationError
from django.db.models import Q
from django.apps import apps
from .utils import safe_delete_user
from django.core.validators import MinValueValidator, MaxValueValidator


class ProtectedDeleteModel(models.Model):
    class Meta:
        abstract = True

    def can_be_deleted(self):
        """By default - can be deleted. Redefine in the necessary models."""
        return True

    def delete(self, *args, **kwargs):
        if not self.can_be_deleted():
            raise ValidationError(f"The {self.__class__.__name__} object cannot be deleted while it is in use.")
        super().delete(*args, **kwargs)

class CustomUser(ProtectedDeleteModel, AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=40, unique=True)
    is_email_verified = models.BooleanField(default=False)
    motivation_grade = models.PositiveSmallIntegerField(
        null=True, blank=True
    )
    computer_literacy_grade = models.PositiveSmallIntegerField(
        null=True, blank=True
    )
    problem_solving_grade = models.PositiveSmallIntegerField(
        null=True, blank=True
    )
    last_verification_email_sent = models.DateTimeField(
        null=True, blank=True
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def can_be_deleted(self):
        # Checking if it is possible to delete (in our case always True)
        return True

    def delete(self, *args, **kwargs):
        safe_delete_user(self)

    def show_deletion_dependencies(self):
        GeneralUserInfo = apps.get_model('api', 'GeneralUserInfo')
        dependencies = {
            "GeneralUserInfo": hasattr(self, "general_user_info"),
            "Education": self.education.exists(),
            "Employment": self.employment.exists(),
            "Certifications": self.certifications.exists(),
            "Projects": self.projects.exclude(project_examples__isnull=False).exists(),
        }

        for model, exists in dependencies.items():
            if exists:
                print(f"[!] {model} still linked to user {self.pk}")

        # Optional: List Skills that are not used by anyone except this user
        info = GeneralUserInfo.objects.filter(user=self).first()
        if info:
            user_skills = set(info.skills.all()) | set(info.new_skills.all())
            shared_skills = []
            for skill in user_skills:
                if skill.skills.exclude(id=info.id).exists() or skill.new_skills.exclude(id=info.id).exists():
                    shared_skills.append(skill.skill)
            if shared_skills:
                print(f"[*] Some Skills are shared with others: {shared_skills}")
        else:
            print(f"No GeneralUserInfo found for user {self.pk}, skipping skills check")

User = get_user_model()

class GeneralUserInfo(models.Model):   
    full_name = models.CharField(max_length=100)
    occupation = models.CharField(max_length=100, blank=True, null=True)
    profile_or_career_objective = models.TextField(blank=True, null=True)
    skills = models.ManyToManyField(
        'Skills', related_name='skills', blank=True
    )
    LinkedIn = models.URLField(blank=True, null=True)
    GitHub = models.URLField(blank=True, null=True)
    spoken_languages = models.JSONField(default=list, blank=True)
    new_profile = models.TextField()
    new_skills = models.ManyToManyField(
        'Skills', related_name='new_skills'
    )
    phone = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField()
    address = models.CharField(max_length=100, blank=True, null=True)
    personal_website_or_portfolio = models.URLField(blank=True, null=True)    
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='general_user_info'
    )

    def __str__(self):
        return f"{self.full_name} — {self.occupation}"

class Education(ProtectedDeleteModel):
    institution = models.CharField(max_length=150)
    degree = models.CharField(max_length=100)
    location = models.CharField(max_length=100, blank=True, null=True)
    graduation_date = models.ForeignKey(
        'Dates', on_delete=models.PROTECT, related_name='graduation_date',
        blank=True, null=True
    )
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='education'
    )

    def __str__(self):
        return f"{self.institution} — {self.degree}"

    def can_be_deleted(self):
        # Check if graduation_date is used anywhere else
        if self.graduation_date:
            still_used = Education.objects.filter(
                graduation_date=self.graduation_date
            ).exclude(pk=self.pk).exists()
            if still_used:
                return False
        return True
    
class Employment(ProtectedDeleteModel):
    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    responsibilities = models.JSONField(default=list, blank=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    start_date = models.ForeignKey(
        'Dates', on_delete=models.PROTECT, related_name='start_date',
        blank=True, null=True
    )
    end_date = models.ForeignKey(
        'Dates', on_delete=models.PROTECT, related_name='end_date',
        blank=True, null=True
    ) 
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='employment'
    )

    def __str__(self):
        return f"{self.company} — {self.position}"

    def can_be_deleted(self):
        for field in ['start_date', 'end_date']:
            date_obj = getattr(self, field)
            if date_obj:
                still_used = Employment.objects.filter(
                    Q(start_date=date_obj) | Q(end_date=date_obj)
                ).exclude(pk=self.pk).exists()
                if still_used:
                    return False
        return True
    
class Projects(ProtectedDeleteModel):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    features = models.JSONField(default=list, blank=True)
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='projects',
        null=True, blank=True
    )

    def __str__(self):
        return self.title
    
    def can_be_deleted(self):
        return True

class Certifications(ProtectedDeleteModel):
    info = models.CharField(max_length=255)
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='certifications'
    )

    def __str__(self):
        return self.info

    def can_be_deleted(self):
        return True
    
class Skills(ProtectedDeleteModel):
    skill = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.skill

    def can_be_deleted(self):
        return (
            not self.skills.exists()
            and not self.new_skills.exists()
            and not self.acquired_skills.exists()
        )

class Dates(ProtectedDeleteModel):
    date = models.CharField(max_length=40, unique=True, null=True, blank=True)

    def __str__(self):
        return str(self.date) if self.date else "(empty)"

    def can_be_deleted(self):
        return (
            not self.graduation_date.exists()
            and not self.start_date.exists()
            and not self.end_date.exists()
        )

class Courses(models.Model):
    job_title = models.CharField(max_length=60, unique=True)
    course_title = models.CharField(max_length=100)
    capabilities = models.ManyToManyField(
        'Capabilities', related_name='course_capabilities'
    )
    course_skills = models.ManyToManyField(
        'Skills', related_name='acquired_skills'
    )
    course_projects = models.ManyToManyField(
        'ProjectExamples', related_name='course_projects'
    )

    def __str__(self):
        return self.course_title

class Capabilities(ProtectedDeleteModel):
    capability = models.CharField(max_length=100)

    def __str__(self):
        return self.capability

    def can_be_deleted(self):
        return not self.course_capabilities.exists()

class PendingEmailChange(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='pending_email_change'
    )
    new_email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return timezone.now() - self.created_at > timedelta(hours=24)

    def __str__(self):
        return f"{self.user.username} → {self.new_email}"

class Languages(models.Model):
    language = models.CharField(
        max_length=50, unique=True, blank=False, null=False)
    language_self_name = models.CharField(
        max_length=50, unique=True, blank=False, null=False)
    cv_summary = models.CharField(max_length=50, blank=False, null=False)
    cv_skills = models.CharField(max_length=50, blank=False, null=False)
    cv_projects = models.CharField(max_length=50, blank=False, null=False)
    cv_experience = models.CharField(max_length=50, blank=False, null=False)
    cv_certifications = models.CharField(max_length=50, blank=False, null=False)
    cv_education = models.CharField(max_length=50, blank=False, null=False)
    cv_languages = models.CharField(max_length=50, blank=False, null=False)

    def __str__(self):
        return self.language
    
class ProjectExamples(ProtectedDeleteModel):
    title = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField(blank=False, null=False)
    features = models.JSONField(default=list, blank=True)
    language_id = models.ForeignKey(
        Languages, on_delete=models.CASCADE, related_name='project_language',
        blank=False, null=False
    )

    def __str__(self):
        return self.title
    
    def can_be_deleted(self):
        return not self.course_projects.exists()

class CareerMap(models.Model):
    course = models.ForeignKey(
        'Courses', on_delete=models.CASCADE, related_name='career_stages'
    )
    stage_number = models.PositiveSmallIntegerField(blank=False, null=False)
    stage_title = models.CharField(max_length=100, blank=False, null=False)
    years_from = models.SmallIntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(30)],
        blank=False, null=False
    )
    years_to = models.PositiveSmallIntegerField(
        validators=[MaxValueValidator(30)],
        blank=False, null=False
    )
    goal = models.CharField(max_length=255, blank=False, null=False)
    skills = models.JSONField(default=list, blank=True)
    capabilities = models.JSONField(default=list, blank=True)
    job_titles = models.JSONField(default=list, blank=True)
    learning_paths = models.JSONField(default=list, blank=True)
    recommended_projects = models.JSONField(default=list, blank=True)

    class Meta:
        unique_together = ('course', 'stage_number')
        ordering = ['stage_number']

    def clean(self):
        super().clean()
        if self.years_from > self.years_to:
            raise ValidationError("The year the stage begins cannot be greater than the year it ends.")

    def __str__(self):
        return f"{self.stage_number}. {self.stage_title} ({self.years_from}-{self.years_to} years)"
