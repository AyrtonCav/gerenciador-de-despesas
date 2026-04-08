from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone
from decimal import Decimal
from datetime import timedelta

class Expense(models.Model):
    CATEGORY_CHOICES = [
        ('alimentacao', 'Alimentação'),
        ('transporte', 'Transporte'),
        ('lazer', 'Lazer'),
        ('contas', 'Contas'),
        ('saude', 'Saúde'),
        ('educacao', 'Educação'),
        ('outros', 'Outros'),
    ]

    description = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', '-created_at']
        verbose_name = 'Despesa'
        verbose_name_plural = 'Despesas'

    def __str__(self):
        return f"{self.description} - R$ {self.value}"
    
    def clean(self):
        errors = {}

        if self.value is not None and self.value <= 0:
            errors['value'] = 'O valor da despesa deve ser maior que zero.'

        if self.value is not None and self.value > 1000000:
            errors['value'] = 'O valor da despesa é muito alto. Verifique se digitou corretamente.'

        if self.date and self.date > timezone.now().date():
            errors['date'] = 'A data da despesa não pode ser no futuro.'

        if self.date and self.date < (timezone.now().date() - timedelta(days=1825)):
            errors['date'] = 'A data da despesa é muito antiga (mais de 5 anos).'

        if self.description and not self.description.strip():
            errors['description'] = 'A descrição não pode estar vazia.'

        if errors:
            raise ValidationError(errors)

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
