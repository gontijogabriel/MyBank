from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password
from user.validators import cpf_validator


class User(AbstractUser):
    cpf = models.CharField(max_length=14, unique=True, validators=[cpf_validator])
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    password = models.CharField(max_length=128)

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        cpf_validator(self.cpf)
        super().save(*args, **kwargs)