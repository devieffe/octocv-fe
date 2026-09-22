from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from .utils import send_verification_email
import re
import logging
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from django.db.models import ProtectedError
from django.db.models import Q

from .models import (
    GeneralUserInfo,
    Education,
    Employment,
    Certifications,    
    Projects,
    Skills,
    Dates,
    Courses,
    Capabilities,
    CustomUser,
    PendingEmailChange,
    Languages,
    ProjectExamples,
    CareerMap,
)

User = get_user_model()

logger = logging.getLogger(__name__)

class NameValidationMixin:
    def validate_text_field(self, value, field_name):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                f"{field_name.replace('_', ' ').capitalize()} cannot be empty.")
        if len(value) < 1 or len(value) > 40:
            raise serializers.ValidationError(
                f"{field_name.replace('_', ' ').capitalize()} must be between 1 and 40 characters.")
        if not re.match(r"^[A-Za-zÀ-ÿ0-9_\- ]+$", value):
            raise serializers.ValidationError(
                f"{field_name.replace('_', ' ').capitalize()} contains invalid characters.")
        return value

    def validate_first_name(self, value):
        return self.validate_text_field(value, "first_name")

    def validate_last_name(self, value):
        return self.validate_text_field(value, "last_name")

    def validate_username(self, value):
        return self.validate_text_field(value, "username")

class UrlSanitizationMixin:
    url_fields = []  # Defined in the inherited class

    def sanitize_urls(self, data):
        validator = URLValidator()

        for field in self.url_fields:
            url = data.get(field)

            if not url:
                data[field] = None
                continue

            url = url.strip()

            if not url.startswith(('http://', 'https://')):
                url = 'https://' + url

            try:
                validator(url)
                data[field] = url
            except ValidationError:
                data[field] = None

        return data

class UserSerializer(serializers.ModelSerializer, NameValidationMixin):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)

    class Meta:
        model = get_user_model()
        fields = ['id','username','password', 'first_name', 'last_name', 'email', \
            'motivation_grade', 'computer_literacy_grade', 'problem_solving_grade']
        extra_kwargs = {
            'username': {'required': True},
            'password': {'write_only': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
        }
    
    def validate_email(self, value):
        if get_user_model().objects.filter(email=value).exists():
            raise serializers.ValidationError("This email address already in use.")
        return value

    def validate_username(self, value):
        if get_user_model().objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with this username already exists.")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = get_user_model()(**validated_data)
        try:
            user.set_password(password)
            user.save()
        except Exception as e:
            print("Error saving user:", e)
        try:
            send_verification_email(user)
        except Exception as e:
            print("Error sending email:", e)

        return user
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['is_staff'] = self.user.is_staff

        user = self.user
        if not user.is_email_verified:
            raise AuthenticationFailed('Email not verified.', code='email_not_verified')

        return data

class SkillListField(serializers.ListField):
    child = serializers.CharField()

    def to_internal_value(self, data):
        return [skill.strip() for skill in data if skill.strip()]

    def to_representation(self, value):
        return [s.skill for s in value.all()]

class DateToObjectField(serializers.CharField):
    def to_internal_value(self, data):
        data = str(data).strip() if data is not None else ''
        if not data:  # Empty string or None
            return None
        
        obj, _ = Dates.objects.get_or_create(date=data)
        return obj

    def to_representation(self, value):
        return value.date if value else None

class GeneralUserInfoSerializer(
        UrlSanitizationMixin, 
        serializers.ModelSerializer,
    ):
    skills = SkillListField(required=False)
    url_fields = ['LinkedIn', 'GitHub', 'personal_website_or_portfolio']
    # new_skills = SkillListField()

    class Meta:
        model = GeneralUserInfo
        exclude = ['user', 'new_skills', 'new_profile']

    def to_internal_value(self, data):
        data = self.sanitize_urls(data)
        return super().to_internal_value(data)

class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = ['id', 'skill']

class EducationSerializer(serializers.ModelSerializer):
    graduation_date = DateToObjectField(allow_null=True, required=False)

    class Meta:
        model = Education
        exclude = ['user_id']
        
class EmploymentSerializer(serializers.ModelSerializer):
    start_date = DateToObjectField(allow_null=True, required=False)
    end_date = DateToObjectField(allow_null=True, required=False)

    class Meta:
        model = Employment
        exclude = ['user_id']
        
class CertificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certifications
        exclude = ['user_id']
        
class ProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        exclude = ['user_id']
        
class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        depth = 1
        fields = '__all__'

class JobTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = ['job_title', 'course_title']

class CVSerializer(serializers.Serializer):
    personal = GeneralUserInfoSerializer()
    employment_history = EmploymentSerializer(many=True, allow_empty=True)
    projects = ProjectsSerializer(many=True, allow_empty=True)
    education = EducationSerializer(many=True, allow_empty=True)
    certifications = serializers.ListField(
        child=serializers.CharField(max_length=255),
        allow_empty=True,
        required=False
        )
    skills = SkillListField(required=False, allow_empty=True)
    spoken_languages = serializers.ListField(child=serializers.CharField(), \
        required=False, allow_empty=True)
    # We don't save new_skills (virtual skills) in the database!
    new_skills = serializers.ListField(child=serializers.CharField(), required=True)
    new_profile = serializers.JSONField(required=True)

    def sync_related(self, model, user, incoming_data, identity_fields, date_fields=None):
        """
        A universal method for synchronizing related records:
        - model: model (Employment, Education, etc.)
        - user: current user
        - incoming_data: list of data from CV
        - identity_fields: list of fields by which the uniqueness of the record is determined (tuple!)
        - date_fields: fields that require processing Dates.get_or_create
        """
        if date_fields is None:
            date_fields = []

        # Dictionary: (key by identity_fields) -> object
        existing = {
            tuple(getattr(obj, field) for field in identity_fields): obj
            for obj in model.objects.filter(user_id=user)
        }

        incoming_keys = set()
        
        for item in incoming_data:
            # If item is not a dictionary, wrap it in a dictionary
            if not isinstance(item, dict):
                item = {identity_fields[0]: item}
            
            key = tuple(item[field] for field in identity_fields)
            incoming_keys.add(key)

            if key in existing:
                obj = existing[key]
                for field, value in item.items():
                    if field in date_fields:
                        if value in (None, ''):
                            setattr(obj, field, None)
                        else:
                            date_obj, _ = Dates.objects.get_or_create(date=value)
                            setattr(obj, field, date_obj)
                    else:
                        setattr(obj, field, value)
                obj.save()
            else:
                # Creating a new object
                kwargs = {}
                for field, value in item.items():
                    if field in date_fields:
                        if value in (None, ''):
                            kwargs[field] = None
                        else:
                            kwargs[field], _ = Dates.objects.get_or_create(date=value)
                    else:
                        kwargs[field] = value
                model.objects.create(user_id=user, **kwargs)

        # Collect objects that are not in incoming_data - they need to be deleted
        to_delete = [
            obj for key, obj in existing.items()
            if key not in incoming_keys
        ]

        # Unlink the dates and delete the objects themselves
        for obj in to_delete:
            # Save links to dates BEFORE unlinking
            date_refs = {field: getattr(obj, field) for field in date_fields if getattr(obj, field)}

            # Unlinking dates
            for field in date_fields:
                if field in date_refs:
                    setattr(obj, field, None)

            # Save the object after unlinking
            if obj.pk:
                obj.save()

            # Check if dates are still in use after unlinking
            for field, date_obj in date_refs.items():
                if date_obj:
                    # Is the date used by other objects
                    is_used = any([
                        Education.objects.filter(graduation_date=date_obj).exists(),
                        Employment.objects.filter(start_date=date_obj).exists(),
                        Employment.objects.filter(end_date=date_obj).exists(),
                    ])

                    if not is_used:
                        logger.debug(f"Date {date_obj} is no longer in use, so deleting it.")
                        date_obj.delete()
                    else:
                        logger.debug(f"Date {date_obj} is still in use, not deleting it.")

            # It is now safe to delete the object
            obj.delete()
            logger.debug(f"Deleted object: {obj}")

    def create(self, validated_data):
        user = self.context['request'].user

        personal_data = validated_data.pop('personal')
        employment_data = validated_data.pop('employment_history', [])
        projects_data = validated_data.pop('projects', [])
        education_data = validated_data.pop('education', [])
        certifications_data = validated_data.pop('certifications', [])
        skills_data = validated_data.pop('skills', [])
        languages_data = validated_data.pop('spoken_languages', [])
        # new_skills_data = validated_data.pop("new_skills")
        new_profile_data = validated_data.pop("new_profile")        

        general_info, _ = GeneralUserInfo.objects.get_or_create(user=user)
        for field, value in personal_data.items():
            setattr(general_info, field, value)
        if languages_data:
            general_info.spoken_languages = languages_data
        general_info.new_profile = new_profile_data

        general_info.save()

        # sync related records
        self.sync_related(Employment, user, employment_data,
                        identity_fields=('position', 'company'),
                        date_fields=['start_date', 'end_date'])

        self.sync_related(Education, user, education_data,
                        identity_fields=('institution', 'degree'),
                        date_fields=['graduation_date'])

        self.sync_related(Projects, user, projects_data,
                        identity_fields=('title',))

        self.sync_related(Certifications, user, certifications_data,
                        identity_fields=('info',))

        current_skills = set(general_info.skills.all())
        # updated_skills = set(skills_data)
        updated_skills = set(
            Skills.objects.get_or_create(skill=name.strip())[0]
            for name in skills_data if name.strip()
        )

        # assigning updated_skills: these new skills are not virtual, but those 
        # that the user himself indicated when updating their CV.
        general_info.skills.set(updated_skills)
        removed_skills = current_skills - updated_skills

        for skill in removed_skills:
            used_elsewhere = (
                skill.skills.exclude(pk=general_info.pk).exists()
                or skill.acquired_skills.exists()  
            )

            if not used_elsewhere:
                skill.delete()

        return general_info

class UserNameSerializer(serializers.ModelSerializer, NameValidationMixin):
    class Meta:
        model = User
        fields = ['first_name', 'last_name']

class EmailChangeRequestSerializer(serializers.Serializer):
    new_email = serializers.EmailField()

    def validate_new_email(self, value):
        # Optional: check if email already used
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

class UserListSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    date_joined = serializers.DateTimeField(format="%Y-%m-%d")

    class Meta:
        model = CustomUser
        fields = ['id', 'full_name', 'email', 'date_joined']

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

class UserDetailSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    date_joined = serializers.DateTimeField(format="%Y-%m-%d")
    occupation = serializers.SerializerMethodField()
    profile_or_career_objective = serializers.SerializerMethodField()
    LinkedIn = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()
    spoken_languages = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            'id', 'full_name', 'email', 'date_joined', 'motivation_grade',
            'computer_literacy_grade', 'problem_solving_grade', 'occupation',
            'profile_or_career_objective', 'LinkedIn', 'address',
            'spoken_languages'
        ]

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

    def _get_general_info_attr(self, obj, attr):
        general_info = getattr(obj, 'general_user_info', None)
        return getattr(general_info, attr, None) if general_info else None

    def get_occupation(self, obj):
        return self._get_general_info_attr(obj, 'occupation')

    def get_profile_or_career_objective(self, obj):
        return self._get_general_info_attr(obj, 'profile_or_career_objective')

    def get_LinkedIn(self, obj):
        return self._get_general_info_attr(obj, 'LinkedIn')

    def get_address(self, obj):
        return self._get_general_info_attr(obj, 'address')

    def get_spoken_languages(self, obj):
        langs = self._get_general_info_attr(obj, 'spoken_languages')
        return ', '.join(langs) if langs else ''

class LanguagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Languages
        fields = '__all__'

class LanguageNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Languages
        fields = ['language', 'language_self_name']

class ProjectExamplesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectExamples
        exclude = ['id']

class CareerMapSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerMap
        exclude = ['id', 'course']