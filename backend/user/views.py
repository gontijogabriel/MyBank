from rest_framework import viewsets
from user.models import User
from user.serializers import UserSerializer, UserListSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.action == 'retrieve' or self.action == 'list':
            return UserListSerializer
        return UserSerializer
