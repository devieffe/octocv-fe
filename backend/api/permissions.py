from rest_framework.permissions import BasePermission

class HasPassedTests(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return (
            user.motivation_grade is not None
            and user.computer_literacy_grade is not None
            and user.problem_solving_grade is not None
        )