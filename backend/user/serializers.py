from rest_framework import serializers
from django.contrib.auth.models import Permission
from user.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        

class UserListSerializer(serializers.ModelSerializer):
    permissions = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'cpf', 'amount', 'permissions']

    def get_permissions(self, obj):
        return [perm.codename for perm in obj.user_permissions.all()]