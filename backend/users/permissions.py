from rest_framework.permissions import BasePermission

class IsRoleAdmin(BasePermission):
    """
    Allows access only to users with role 'ADMIN'.
    """
    def has_permission(self, request, view):
        return bool(request.user and getattr(request.user, 'role', None) == 'ADMIN')
