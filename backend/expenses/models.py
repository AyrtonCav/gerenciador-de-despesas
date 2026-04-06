from django.db import models

class Expense(models.Model):
    CATEGORY_CHOICES = [
        ('alimentacao', 'alimentacao'),
        ('transporte', 'transporte'),
        ('lazer', 'lazer'),
        ('contas', 'contas'),
        ('saude', 'saude'),
        ('educacao', 'educacao'),
        ('outros', 'outros'),
    ]

    description = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description