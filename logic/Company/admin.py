from django.contrib import admin
from .models import Company, Employee

# Register your models here.
models_list = [Company, Employee]
admin.site.register(Company)
admin.site.register(Employee)
