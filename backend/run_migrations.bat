@echo off
cd "c:\Users\Ayrton Cavalcante\Documents\Gerenciamento Financeiro\backend"
python manage.py makemigrations
python manage.py migrate
pause
