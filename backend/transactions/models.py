from django.db import models
from user.models import User


class Transaction(models.Model):
    payer = models.ForeignKey(User, related_name='transactions_as_payer', on_delete=models.CASCADE)
    payee = models.ForeignKey(User, related_name='transactions_as_payee', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transaction from {self.payer.username} to {self.payee.username} of ${self.amount}"
