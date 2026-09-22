"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import CustomTokenObtainPairView
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from api.views import export_students_to_excel
from api.views import UploadCVByStaffView

urlpatterns = [
    path('admin/export-students/', export_students_to_excel, name='export_excel'),
    path('admin/upload-cv-by-staff/', UploadCVByStaffView.as_view(), name='cv_by_staff'),
    path('admin/', admin.site.urls),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/', include('api.urls')),
    path('', TemplateView.as_view(template_name='index.html'), name='frontend'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)