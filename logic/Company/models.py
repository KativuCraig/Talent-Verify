from django.db import models

# Create your models here.

class Company(models.Model):
    name = models.CharField(max_length=255)
    date_of_registration = models.DateField()
    registration_number = models.CharField(max_length=255, primary_key=True)
    address = models.TextField()
    contact_person = models.CharField(max_length=255)
    departments = models.TextField()  
    number_of_employees = models.IntegerField()
    contact_phone = models.CharField(max_length=20)
    email_address = models.EmailField()

    def __str__(self):
        return self.name

class Employee(models.Model):
    name = models.CharField(max_length=255)
    employee_id_number = models.CharField(max_length=255, blank=True, null=True)
    company_name = models.CharField(max_length=255, blank = False, null = True) 
    department = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    date_started = models.DateField()
    date_left = models.DateField(blank=True, null=True)
    duties = models.TextField()

    def __str__(self):
        return self.name