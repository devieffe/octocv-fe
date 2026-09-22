from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.permissions import IsAdminUser
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from django.db import transaction
from .extract_doc import extract_text_doc
from .extract_pdf import extract_plain_text_pdf
from .parse_cv_ai import get_json
from .parse_links import parse_links
from .create_docx_cv import create_new_cv_docx
import os, tempfile, json, ast, traceback, re
from .permissions import HasPassedTests
from rest_framework.exceptions import ValidationError
from rest_framework.exceptions import PermissionDenied
from rest_framework.exceptions import NotFound
from django.utils import timezone
from datetime import timedelta
from django.conf import settings
from pathlib import Path
from django.http import FileResponse, Http404
from django.urls import reverse
from django.core.exceptions import ValidationError as DjangoValidationError
from django.core.exceptions import ObjectDoesNotExist
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.password_validation import validate_password
import random
import copy
from django.http import HttpResponse
from openpyxl import Workbook
from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ReadOnlyModelViewSet

from .utils import (
    send_verification_email,
    verify_email_token,
    verify_email_change_token,
    send_password_reset_email,
    get_grade,
    safe_delete_user,
)

from .models import (
    GeneralUserInfo,
    Courses,
    CustomUser,
    PendingEmailChange,
    Languages,
    ProjectExamples,
    CareerMap,
)

from .serializers import (
    UserSerializer,
    GeneralUserInfoSerializer,
    EducationSerializer,
    EmploymentSerializer,
    ProjectsSerializer,    
    CertificationsSerializer,
    JobTitleSerializer,
    CoursesSerializer,
    CustomTokenObtainPairSerializer,
    CVSerializer,
    UserNameSerializer,
    EmailChangeRequestSerializer,
    UserListSerializer,
    UserDetailSerializer,
    LanguagesSerializer,
    LanguageNameSerializer,
    ProjectExamplesSerializer,
    CareerMapSerializer,
)

User = get_user_model()

# Path to the new CV template file on server
TEMPLATE_DOCX = os.getenv('TEMPLATE_DOCX')
cv_template = Path(settings.BASE_DIR) / 'data' / TEMPLATE_DOCX

SERVER_URL = os.getenv('SERVER_URL')

def download_cv(request, filename):
    temp_dir = tempfile.gettempdir()
    file_path = os.path.join(temp_dir, filename)
    
    if os.path.exists(file_path):
        return FileResponse(open(file_path, 'rb'), 
            as_attachment=True, filename=filename)
    else:
        raise Http404("File not found")

class CareerPathView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, HasPassedTests]
    queryset = Courses.objects.all()
    serializer_class = JobTitleSerializer

class UploadCVView(APIView):
    permission_classes = [IsAuthenticated, HasPassedTests]
    parser_classes = [MultiPartParser, FormParser]

    def post(self,request, *args,**kwargs):
        try:
            uploaded_file = request.FILES.get('file')
            job = request.data.get('job_title')
            language = request.data.get('language')
            file_name = uploaded_file.name
            user = request.user

            try:
                headers = Languages.objects.get(language=language)
            except Languages.DoesNotExist:
                headers = Languages.objects.get(language="English")
            serializer = LanguagesSerializer(headers)
            cv_summary = serializer.data["cv_summary"]
            cv_skills = serializer.data["cv_skills"]
            cv_projects = serializer.data["cv_projects"]
            cv_experience = serializer.data["cv_experience"]
            cv_certifications = serializer.data["cv_certifications"]
            cv_education = serializer.data["cv_education"]
            cv_languages = serializer.data["cv_languages"]
            language_id = serializer.data["id"]

            try:
                course = Courses.objects.get(job_title=job)
            except Courses.DoesNotExist:
                return Response({"error": "Career path not chosen"}, 
                    status=status.HTTP_404_NOT_FOUND)
            serializer = CoursesSerializer(course)
            course_data = serializer.data
            course_title = course_data["course_title"]

            # Get 3 project examples
            all_course_projects = course_data["course_projects"]
            course_projects = [
                project
                for project in all_course_projects
                if project.get("language_id") == language_id
            ]
            if len(course_projects) > 3:
                course_projects = random.sample(course_projects, 3)
            allowed_fields = {'title', 'description', 'features'}
            course_projects = [
                {key: project[key] for key in allowed_fields if key in project}
                for project in course_projects
            ]

            new_capabilities = '; '.join(
                [a["capability"] for a in course_data["capabilities"]]
                )
            new_skills = ', '.join(
                [a["skill"] for a in course_data["course_skills"]]
                )

            if not uploaded_file:
                return Response({"error": "No file uploaded"}, 
                    status=status.HTTP_400_BAD_REQUEST)
            
            if uploaded_file.size > 5 * 1024 * 1024:  # 5MB limit
                return Response({'error': 'File is too large'}, 
                    status=status.HTTP_400_BAD_REQUEST)
            

            # Placeholder for PDF parsing logic, example of final object for saving data in db below
            # file_obj = uploaded_file
            if file_name.lower().endswith('pdf') or file_name.lower().endswith('doc') or file_name.lower().endswith('docx'):
                with tempfile.NamedTemporaryFile(delete=False) as temp_file:
                    for chunk in uploaded_file.chunks():
                        temp_file.write(chunk)
                    temp_file_path = temp_file.name
            else:
                return Response({'error':'Invalid file format'}, 
                    status=status.HTTP_400_BAD_REQUEST)
            
            if file_name.lower().endswith('pdf'):
                text, links = extract_plain_text_pdf(temp_file_path)
            elif file_name.lower().endswith('doc') or file_name.lower().endswith('docx'):
                text, links = extract_text_doc(temp_file_path)
            os.remove(temp_file_path)

            # checking the length of the extracted text
            if len(text) > 4096:
                return Response({'error': 'Your CV is too long. Try reducing its size'}, status=status.HTTP_400_BAD_REQUEST)
            elif len(text) < 256:
                return Response({'error': 'Your CV is too short or it is impossible to extract text from it'}, status=status.HTTP_400_BAD_REQUEST)

            # get AI response
            ai_response = get_json(text, job, new_capabilities, new_skills, language)

            # prepare AI response in JSON format
            if ai_response.startswith('```json'):
                ai_response = ai_response[6:]
            if ai_response.endswith('```'):
                ai_response = ai_response[:-3]
            ai_response = ai_response[:ai_response.rfind('}')+1]
            ai_response = ai_response[ai_response.find('{'):]
            ai_response.strip()
            
            # convert AI response to JSON
            try:
                json_cv = json.loads(ai_response)
            except json.JSONDecodeError as e:
                return Response({'error': str(e)}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                if 'error' in json_cv: # AI thinks this is not a CV or the text after the parsing is unreadable
                    return Response({'error': json_cv['error']}, 
                        status=status.HTTP_400_BAD_REQUEST)

            json_cv['position'] = job
            linkedin_link, github_link = parse_links(links)
            json_cv['personal']['LinkedIn'] = linkedin_link
            json_cv['personal']['GitHub'] = github_link
            
            # correct the CV fields if necessary
            if not json_cv['personal']['full_name']:
                json_cv['personal']['full_name'] = ' '.join([user.first_name, user.last_name])
            if not json_cv['personal']['email']:
                json_cv['personal']['email'] = user.email

            # Create a copy of json_cv for DB
            json_db = copy.deepcopy(json_cv)

            # Add the DI course to the CV
            json_cv['education'].insert(0, {
                "degree": course_title, "institution": "Developers Institute", 
                "location": "Tel Aviv, Israel", "graduation_date": None
            })

            # Add 3 project examples to the CV
            real_projects = json_cv.get('projects')
            if not isinstance(real_projects, list):
                real_projects = []
            json_cv['projects'] = course_projects + real_projects
            json_cv['cv_summary'] = cv_summary
            json_cv['cv_skills'] = cv_skills
            json_cv['cv_projects'] = cv_projects
            json_cv['cv_experience'] = cv_experience
            json_cv['cv_certifications'] = cv_certifications
            json_cv['cv_education'] = cv_education
            json_cv['cv_languages'] = cv_languages

            # create and write new CV file & add data to the database
            temp_dir = tempfile.gettempdir()
            custom_filename = '_'.join([json_cv['personal']['full_name'], "OctoCV.docx"])
            custom_filename = re.sub(r"\s+", "_", custom_filename)
            new_cv_docx = os.path.join(temp_dir, custom_filename)
            try:
                with open(new_cv_docx, 'wb') as temp_file:
                    create_new_cv_docx(json_cv, cv_template, new_cv_docx)
            except Exception as e:
                return Response({'error': str(e)}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            download_url = SERVER_URL + reverse("download_cv", 
                kwargs={"filename": custom_filename}).lstrip("/")

            # Here - atomically save
            try:
                with transaction.atomic():
                    serializer = CVSerializer(
                        data=json_db, context={'request': request}
                    )
                    if not serializer.is_valid():
                        raise Exception(serializer.errors)
                    serializer.save()
            except Exception as e:
                # Any error during save() will rollback all DB operations, 
                # including get_or_create for Skills
                return Response({
                    'message': 'New CV created successfully, but write to database failed',
                    'error': str(e),
                    'url': download_url
                }, status=status.HTTP_400_BAD_REQUEST)

            return Response({
                'message': 'New CV created successfully',
                'url': download_url
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            print("ERROR:", e)
            traceback.print_exc()
            return Response({"error": "Internal server error"}, status=500)

class SubmitMotivationTestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        
        if user.motivation_grade is not None:
            raise PermissionDenied("You have already taken this test")

        responses = request.data.get("responses")
        if not isinstance(responses, list):
            raise ValidationError("The responses field must be a list")

        weights_str = settings.MOTIVATION_WEIGHTS
        weights = ast.literal_eval(weights_str)

        if len(responses) != len(weights):
            raise ValidationError("Responses and weights must have the same length")
        for i, r in enumerate(responses):
            if not isinstance(r, int) or r < 0:
                raise ValidationError("Answer values must be non-negative integers")

        # Weighted average calculation
        weighted_sum = sum(r * w for r, w in zip(responses, weights))
        total_weight = sum(weights)

        grade = round(weighted_sum / total_weight)
        user.motivation_grade = grade
        user.save()

        return Response({
            "message": "The test result has been saved"
        })

class RegisterView(APIView):
    permission_classes = [AllowAny]
    http_method_names = ['post']

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            print("== serializer is valid ==")
            serializer.save()
            return Response({
                'message': 'Registration successful. Check your email for confirmation.'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, 
            status=status.HTTP_400_BAD_REQUEST)

class VerifyEmailView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        token = request.query_params.get('token')
        user_id = verify_email_token(token)
        if not user_id:
            return Response({'error': 'Invalid or expired token'}, 
                status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)
            user.is_email_verified = True
            user.save()
            return Response({'message': 'Email confirmed successfully!'})
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class ResendVerificationEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required.'}, 
                status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User with this email does not exist.'}, 
                status=404)

        if user.is_email_verified:
            return Response({'message': 'Email is already verified.'})

        now = timezone.now()
        if user.last_verification_email_sent and now - user.last_verification_email_sent < timedelta(minutes=2):
            return Response({'error': 'Please wait before resending the email.'}, 
                status=429)

        verify_url = send_verification_email(user) # FOR TESTING PURPOSES ONLY !!!
        user.last_verification_email_sent = now
        user.save()

        return Response({'message': 'Verification email resent successfully.',
            'verify_email_url': verify_url # FOR TESTING PURPOSES ONLY !!!
            }, status=200)

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        # Check if old password is correct
        if not user.check_password(old_password):
            return Response({'error': 'Incorrect current password'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Validate new password
        try:
            validate_password(new_password, user)
        except DjangoValidationError as e:
            raise ValidationError({'password': e.messages})

        # Set and save new password
        user.set_password(new_password)
        user.save()
        return Response({'message': 'Password changed successfully'
        }, status=status.HTTP_200_OK)

class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')

        try:
            user = User.objects.get(email=email)
            reset_url = send_password_reset_email(user) # FOR TESTING PURPOSES ONLY !!!
        except User.DoesNotExist:
            # Don't leak info: respond with success anyway
            pass

        return Response({'message': 'If a user with this email exists, a password reset link was sent.',
        'reset_url': reset_url # FOR TESTING PURPOSES ONLY !!!
        }, status=status.HTTP_200_OK)

class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, uidb64, token):
        new_password = request.data.get('new_password')

        # Decode user ID from base64
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'error': 'Invalid reset link'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Check reset token
        if not default_token_generator.check_token(user, token):
            return Response({'error': 'Invalid or expired token'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Validate new password
        try:
            validate_password(new_password, user)
        except DjangoValidationError as e:
            raise ValidationError({'password': e.messages})

        # Set and save new password
        user.set_password(new_password)
        user.save()
        return Response({'message': 'Password has been reset successfully'
        }, status=status.HTTP_200_OK)

class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        password = request.data.get('password')

        if not password:
            raise ValidationError({'password': 'Password is required to delete account.'})

        if not user.check_password(password):
            raise ValidationError({'password': 'Incorrect password.'})

        # Use the safe delete function here
        safe_delete_user(user)

        return Response({
            "success": True,
            "message": "Your account has been deleted"
        }, status=status.HTTP_200_OK)

class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UserNameSerializer(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Profile updated successfully'}, 
                status=status.HTTP_200_OK)
        
        return Response(serializer.errors, 
            status=status.HTTP_400_BAD_REQUEST)

class RequestEmailChangeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EmailChangeRequestSerializer(data=request.data)
        if serializer.is_valid():
            new_email = serializer.validated_data['new_email']
            obj, _ = PendingEmailChange.objects.update_or_create(
                user=request.user,
                defaults={'new_email': new_email}
            )
            # Request confirmation of new email
            verify_url = send_verification_email(request.user, new_email)
            return Response({'message': 'Confirmation email sent.',
            'verify_email_url': verify_url # FOR TESTING PURPOSES ONLY !!!
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ConfirmEmailChangeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        token = request.query_params.get('token')
        user, email = verify_email_change_token(token) # Token verification

        if not user or not email:
            return Response({'message': 'Invalid or expired token.'}, 
                status=status.HTTP_400_BAD_REQUEST)

        # Check if there is a pending email change
        try:
            pending = PendingEmailChange.objects.get(user=user, new_email=email)
        except PendingEmailChange.DoesNotExist:
            return Response({'message': 'No pending email change found.'}, 
                status=status.HTTP_400_BAD_REQUEST)

        # Check the expiration date of the request to change email
        if pending.is_expired():
            pending.delete()
            return Response({'message': 'Email change request expired.'}, 
                status=status.HTTP_400_BAD_REQUEST)

        user.email = email
        user.save()
        pending.delete()
        return Response({'message': 'Email successfully updated.'})

class SubmitLiteracyTestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        
        if user.computer_literacy_grade is not None:
            raise PermissionDenied("You have already taken this test")

        responses = request.data.get("responses")
        if not isinstance(responses, list):
            raise ValidationError("The responses field must be a list")

        correct_answers_str = settings.LITERACY_CORRECT_ANSWERS
        correct_answers = ast.literal_eval(correct_answers_str)

        if len(responses) != len(correct_answers):
            raise ValidationError(
                "Number of responses does not match number of correct answers"
            )
        allowed_letters = {'A', 'B', 'C', 'D'}
        for i, r in enumerate(responses):
            if not isinstance(r, str) or not (r in allowed_letters):
                raise ValidationError("Answer values must be letters A...D")

        # How many answers are correct?
        score = sum(r == c for r, c in zip(responses, correct_answers))

        grade = get_grade(score)
        user.computer_literacy_grade = grade
        user.save()

        return Response({
            "message": "The test result has been saved"
        })

class SubmitLogicTestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        
        if user.problem_solving_grade is not None:
            raise PermissionDenied("You have already taken this test")

        responses = request.data.get("responses")
        if not isinstance(responses, list):
            raise ValidationError("The responses field must be a list")

        correct_answers_str = settings.LOGIC_CORRECT_ANSWERS
        correct_answers = ast.literal_eval(correct_answers_str)

        if len(responses) != len(correct_answers):
            raise ValidationError(
                "Number of responses does not match number of correct answers"
            )
        allowed_letters = {'A', 'B', 'C', 'D'}
        for i, r in enumerate(responses):
            if not isinstance(r, str) or not (r in allowed_letters):
                raise ValidationError("Answer values must be letters A...D")

        # How many answers are correct?
        score = sum(r == c for r, c in zip(responses, correct_answers))

        grade = get_grade(score)
        user.problem_solving_grade = grade
        user.save()

        return Response({
            "message": "The test result has been saved"
        })

class PassedTestsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        passed_tests = [
            user.motivation_grade is not None,
            user.computer_literacy_grade is not None,
            user.problem_solving_grade is not None
        ]
        return Response({"response": passed_tests})

class ShowProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_info = {
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name
        }
        return Response({"user_info": user_info})

def export_students_to_excel(request):
    if not request.user.is_authenticated or not request.user.is_staff:
        return HttpResponse(status=403)

    users = User.objects.filter(
        is_staff=False, 
        is_superuser=False, 
        is_email_verified=True
    ).select_related()

    wb = Workbook()
    ws = wb.active
    ws.title = "Students"

    headers = [
        "ID", "First name", "Last name", "Occupation", 
        "Motivation", "Computer literacy", "Problem solving",
        "Email", "Phone", "Date joined",
    ]
    ws.append(headers)

    for user in users:
        info = GeneralUserInfo.objects.filter(user=user).first()

        row = [
            user.id,            
            user.first_name,
            user.last_name,
            info.occupation if info else '',
            user.motivation_grade,
            user.computer_literacy_grade,
            user.problem_solving_grade,
            user.email,
            info.phone if info else '',
            user.date_joined.strftime("%Y-%m-%d"),
        ]
        ws.append(row)

    response = HttpResponse(
        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    response['Content-Disposition'] = 'attachment; filename=students_export.xlsx'
    wb.save(response)
    return response

class ClearTestsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        user.motivation_grade = None
        user.computer_literacy_grade = None
        user.problem_solving_grade = None
        user.save()

        return Response({
            "message": "The test results have been deleted."
        })

class UploadCVByStaffView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    parser_classes = [MultiPartParser, FormParser]

    def post(self,request, *args,**kwargs):
        try:
            uploaded_file = request.FILES.get('file')
            job = request.data.get('job_title')
            language = request.data.get('language')
            file_name = uploaded_file.name

            try:
                headers = Languages.objects.get(language=language)
            except Languages.DoesNotExist:
                headers = Languages.objects.get(language="English")
            serializer = LanguagesSerializer(headers)
            cv_summary = serializer.data["cv_summary"]
            cv_skills = serializer.data["cv_skills"]
            cv_projects = serializer.data["cv_projects"]
            cv_experience = serializer.data["cv_experience"]
            cv_certifications = serializer.data["cv_certifications"]
            cv_education = serializer.data["cv_education"]
            cv_languages = serializer.data["cv_languages"]
            language_id = serializer.data["id"]

            try:
                course = Courses.objects.get(job_title=job)
            except Courses.DoesNotExist:
                return Response({"error": "Career path not found"}, 
                    status=status.HTTP_404_NOT_FOUND)
            serializer = CoursesSerializer(course)
            course_data = serializer.data
            course_title = course_data["course_title"]

            # Get 3 project examples
            all_course_projects = course_data["course_projects"]
            course_projects = [
                project
                for project in all_course_projects
                if project.get("language_id") == language_id
            ]
            if len(course_projects) > 3:
                course_projects = random.sample(course_projects, 3)
            allowed_fields = {'title', 'description', 'features'}
            course_projects = [
                {key: project[key] for key in allowed_fields if key in project}
                for project in course_projects
            ]

            new_capabilities = '; '.join(
                [a["capability"] for a in course_data["capabilities"]]
                )
            new_skills = ', '.join(
                [a["skill"] for a in course_data["course_skills"]]
                )

            if not uploaded_file:
                return Response({"error": "No file uploaded"}, 
                    status=status.HTTP_400_BAD_REQUEST)
            
            if uploaded_file.size > 5 * 1024 * 1024:  # 5MB limit
                return Response({'error': 'File is too large'}, 
                    status=status.HTTP_400_BAD_REQUEST)
            

            # Placeholder for PDF parsing logic, example of final object for saving data in db below
            if file_name.lower().endswith('pdf') or file_name.lower().endswith('doc') or file_name.lower().endswith('docx'):
                with tempfile.NamedTemporaryFile(delete=False) as temp_file:
                    for chunk in uploaded_file.chunks():
                        temp_file.write(chunk)
                    temp_file_path = temp_file.name
            else:
                return Response({'error':'Invalid file format'}, 
                    status=status.HTTP_400_BAD_REQUEST)
            
            if file_name.lower().endswith('pdf'):
                text, links = extract_plain_text_pdf(temp_file_path)
            elif file_name.lower().endswith('doc') or file_name.lower().endswith('docx'):
                text, links = extract_text_doc(temp_file_path)
            os.remove(temp_file_path)

            # checking the length of the extracted text
            if len(text) > 4096:
                return Response({'error': 'Your CV is too long. Try reducing its size'}, status=status.HTTP_400_BAD_REQUEST)
            elif len(text) < 256:
                return Response({'error': 'Your CV is too short or it is impossible to extract text from it'}, status=status.HTTP_400_BAD_REQUEST)

            # get AI response
            ai_response = get_json(text, job, new_capabilities, new_skills, language)

            # prepare AI response in JSON format
            if ai_response.startswith('```json'):
                ai_response = ai_response[6:]
            if ai_response.endswith('```'):
                ai_response = ai_response[:-3]
            ai_response = ai_response[:ai_response.rfind('}')+1]
            ai_response = ai_response[ai_response.find('{'):]
            ai_response.strip()
            
            # convert AI response to JSON
            try:
                json_cv = json.loads(ai_response)
            except json.JSONDecodeError as e:
                return Response({'error': str(e)}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                if 'error' in json_cv: # AI thinks this is not a CV or the text after the parsing is unreadable
                    return Response({'error': json_cv['error']}, 
                        status=status.HTTP_400_BAD_REQUEST)

            json_cv['position'] = job
            linkedin_link, github_link = parse_links(links)
            json_cv['personal']['LinkedIn'] = linkedin_link
            json_cv['personal']['GitHub'] = github_link
            json_cv['cv_summary'] = cv_summary
            json_cv['cv_skills'] = cv_skills
            json_cv['cv_projects'] = cv_projects
            json_cv['cv_experience'] = cv_experience
            json_cv['cv_certifications'] = cv_certifications
            json_cv['cv_education'] = cv_education
            json_cv['cv_languages'] = cv_languages
            
            # correct the CV fields if necessary
            if not json_cv['personal']['full_name']:
                json_cv['personal']['full_name'] = 'Nameless_Person'

            # Add the DI course to the CV
            json_cv['education'].insert(0, {
                "degree": course_title, "institution": "Developers Institute", 
                "location": "Tel Aviv, Israel", "graduation_date": None
            })

            # Add 3 project examples to the CV
            real_projects = json_cv.get('projects')
            if not isinstance(real_projects, list):
                real_projects = []
            json_cv['projects'] = course_projects + real_projects

            # create and write new CV file & add data to the database
            temp_dir = tempfile.gettempdir()
            custom_filename = '_'.join([json_cv['personal']['full_name'], "OctoCV.docx"])
            custom_filename = re.sub(r"\s+", "_", custom_filename)
            new_cv_docx = os.path.join(temp_dir, custom_filename)
            try:
                with open(new_cv_docx, 'wb') as temp_file:
                    create_new_cv_docx(json_cv, cv_template, new_cv_docx)
            except Exception as e:
                return Response({'error': str(e)}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            download_url = SERVER_URL + reverse("download_cv", 
                kwargs={"filename": custom_filename}).lstrip("/")

            return Response({
                'message': 'New CV created successfully',
                'url': download_url
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            print("ERROR:", e)
            traceback.print_exc()
            return Response({"error": "Internal server error"}, status=500)

class CustomPagination(PageNumberPagination):
    page_size = int(os.getenv('DRF_PAGE_SIZE', 50))

class VerifiedTestedUserListView(generics.ListAPIView):
    serializer_class = UserListSerializer
    permission_classes = [IsAdminUser]
    queryset = CustomUser.objects.filter(
        is_staff=False,
        is_superuser=False,
        is_email_verified=True,
        motivation_grade__isnull=False,
        computer_literacy_grade__isnull=False,
        problem_solving_grade__isnull=False,
    )
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ['first_name', 'last_name', 'email']
    ordering_fields = ['first_name', 'last_name', 'email', 'date_joined']
    ordering = ['date_joined']
    pagination_class = CustomPagination

class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAdminUser]

    def get_object(self):
        pk = self.kwargs.get("pk")

        try:
            user = CustomUser.objects.only(
                "id",
                "first_name",
                "last_name",
                "email",
                "date_joined",
                "motivation_grade",
                "computer_literacy_grade",
                "problem_solving_grade"
            ).get(pk=pk)
        except CustomUser.DoesNotExist:
            raise NotFound("User not found.")

        if user.is_staff or user.is_superuser:
            raise PermissionDenied(
                "You are not allowed to access staff or superuser data."
            )

        return user

class LanguagesView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, HasPassedTests]
    queryset = Languages.objects.all()
    serializer_class = LanguageNameSerializer

class CareerMapView(APIView):
    permission_classes = [IsAuthenticated, HasPassedTests]

    def post(self, request):
        job_title = request.data.get('job_title')
        if not job_title:
            return Response({"detail": "job_title parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            course = Courses.objects.get(job_title__iexact=job_title)
        except Courses.DoesNotExist:
            return Response({"detail": "Job title not found."}, status=status.HTTP_404_NOT_FOUND)

        stages = CareerMap.objects.filter(course=course).order_by('stage_number')
        serializer = CareerMapSerializer(stages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)