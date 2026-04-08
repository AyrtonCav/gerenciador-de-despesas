from rest_framework import viewsets
from .models import Expense
from .serializers import ExpenseSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        queryset = Expense.objects.all()
        return queryset.order_by('-date', '-created_at')