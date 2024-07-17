from rest_framework import serializers
from django.contrib.auth.models import Permission
from transactions.models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'