from django.urls import path
from . import views


urlpatterns = [
    path('register/',
        views.RegisterView.as_view(),
        name='register'
    ),
    path('verify-email/',
        views.VerifyEmailView.as_view(),
        name='verify-email'
    ),

    path('upload-cv/',
        views.UploadCVView.as_view(),
        name='upload-cv'
    ),

    path('career/',
        views.CareerPathView.as_view({'get': 'list'}),
        name='career'
    ),

    path('submit-motivation-test/',
        views.SubmitMotivationTestView.as_view(),
        name='submit-motivation-test'
    ),

    path('resend-verification-email/',
        views.ResendVerificationEmailView.as_view(),
        name='resend-verification-email'
    ),

    path('download/<str:filename>/',
        views.download_cv,
        name='download_cv'
    ),

    path('profile/update/',
        views.UpdateProfileView.as_view(),
        name='update-profile'
    ),

    path('profile/delete/',
        views.DeleteAccountView.as_view(),
        name='delete-account'
    ),

    path('password/change/',
        views.ChangePasswordView.as_view(),
        name='change-password'
    ),

    path('password/reset/',
        views.PasswordResetRequestView.as_view(), 
        name='reset-password'
    ),

    path('password/reset-confirm/<uidb64>/<token>/',
        views.PasswordResetConfirmView.as_view(),
        name='reset-password-confirm'
    ),

    path('email/request-change/',
        views.RequestEmailChangeView.as_view(),
        name='request-email-change'
    ),

    path('email/confirm-change/',
        views.ConfirmEmailChangeView.as_view(), 
        name='confirm-email-change'
    ),

    path('submit-literacy-test/',
        views.SubmitLiteracyTestView.as_view(),
        name='submit-literacy-test'
    ),

    path('submit-logic-test/',
        views.SubmitLogicTestView.as_view(),
        name='submit-logic-test'
    ),

    path('passed-tests/',
        views.PassedTestsView.as_view(),
        name='passed-tests'
    ),

    path('profile/show/',
        views.ShowProfileView.as_view(),
        name='show-profile'
    ),

    path('clear-tests/',
        views.ClearTestsView.as_view(),
        name='clear-tests'
    ),

    path('admin/users/',
        views.VerifiedTestedUserListView.as_view(),
        name='user_list'
    ),

    path('admin/users/<int:pk>/',
        views.UserDetailView.as_view(),
        name='admin_user_details'
    ),

    path('languages/',
        views.LanguagesView.as_view({'get': 'list'}),
        name='languages'
    ),

    path('career-map/',
        views.CareerMapView.as_view(),
        name='career-map'
    ),
]
