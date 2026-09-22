from django.contrib import admin, messages
from django.core.exceptions import ValidationError
from django.db import models
from django.forms import Textarea
import openpyxl
from django.http import HttpResponse
from django.urls import reverse
from django.utils.html import format_html

from .models import (
    GeneralUserInfo,
    CustomUser,
    Projects,
    Skills,
    Education,
    Employment,
    Certifications,
    Dates,
    Courses,
    Capabilities,
    PendingEmailChange,
    Languages,
    ProjectExamples,
    CareerMap,
)

# Safe delete function
@admin.action(description="Safely delete (only if the object is not in use)")
def safe_delete_selected(modeladmin, request, queryset):
    deleted, protected = 0, 0
    for obj in queryset:
        if hasattr(obj, 'can_be_deleted') and not obj.can_be_deleted():
            protected += 1
            modeladmin.message_user(
                request,
                f"The {obj} object cannot be deleted while it is in use.",
                level=messages.ERROR,
            )
        else:
            try:
                obj.delete()
                deleted += 1
            except Exception as e:
                protected += 1
                modeladmin.message_user(
                    request,
                    f"{obj}: error while deleting — {str(e)}",
                    level=messages.ERROR,
                )

    if deleted:
        modeladmin.message_user(
            request,
            f"{deleted} object(s) removed.",
            level=messages.SUCCESS,
        )

# General admin class
class ProtectedDeleteAdmin(admin.ModelAdmin):
    actions = [safe_delete_selected]

    def get_actions(self, request):
        actions = super().get_actions(request)
        # Remove the default delete action
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

    def has_delete_permission(self, request, obj=None):
        return False if obj else True

class CustomUserAdmin(ProtectedDeleteAdmin):
    change_list_template = "admin/customuser_changelist.html"
    list_display = (
        'first_name', 'last_name', 
        'email', 'date_joined'
    )
    actions = [safe_delete_selected]

    def has_view_permission(self, request, obj=None):
        return request.user.is_staff

    def has_add_permission(self, request):
        return request.user.is_superuser

    def has_change_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_delete_permission(self, request, obj=None):
        """Disables deletion via object form (obj != None),
        but allows bulk deletion"""
        return request.user.is_superuser and obj is None

    def delete_model(self, request, obj):
        """Use safe deletion logic for admin bulk deletion"""
        if request.user.is_superuser:
            safe_delete_user(obj)

    def changelist_view(self, request, extra_context=None):
        export_url = reverse('export_excel')
        extra_context = extra_context or {}
        extra_context['export_url'] = export_url
        return super().changelist_view(request, extra_context=extra_context)

class JSONTextareaAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.JSONField: {'widget': Textarea(attrs={'rows': 10, 'cols': 120})}
    }

@admin.register(Projects)
class ProjectsAdmin(ProtectedDeleteAdmin, JSONTextareaAdmin):
    pass

@admin.register(Employment)
class EmploymentAdmin(ProtectedDeleteAdmin, JSONTextareaAdmin):
    pass

@admin.register(GeneralUserInfo)
class GeneralUserInfoAdmin(JSONTextareaAdmin):
    pass

@admin.register(ProjectExamples)
class ProjectExamplesAdmin(ProtectedDeleteAdmin, JSONTextareaAdmin):
    pass

@admin.register(CareerMap)
class CareerMapAdmin(admin.ModelAdmin):
    list_display = ('stage_number', 'stage_title', 'course', 'years_from', 'years_to')
    list_filter = ('course',)
    search_fields = ('stage_title', 'goal', 'course__job_title')
    ordering = ('course', 'stage_number')

admin.site.register(Skills, ProtectedDeleteAdmin)
admin.site.register(Education, ProtectedDeleteAdmin)
admin.site.register(Certifications, ProtectedDeleteAdmin)
admin.site.register(Dates, ProtectedDeleteAdmin)
admin.site.register(Courses)
admin.site.register(Capabilities, ProtectedDeleteAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(PendingEmailChange)
admin.site.register(Languages)