from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import CompanySerializer
from .serializers import EmployeeSerializer
from django.http.response import JsonResponse
from .models import Company
from .models import Employee
from django.http.response   import Http404  # Importing the Http404 exception class
from rest_framework.response import Response  # Importing the response class from the rest_framework module
from rest_framework import status
# Create your views here.

class CompanyView(APIView):
    
    def get_company(self, pk):
        try:
             Company = Company.objects.get(registration_number=pk)
             return Company
        except Company.DoesNotExist():
            raise Http404

    def get(self, request, pk=None):
        if pk:
            data = self.get_company(pk)
            serializer = CompanySerializer(data)

        else:
            data = Company.objects.all()
            serializer = CompanySerializer(data, many=True)

        return Response(serializer.data)    
    
    def post(self, request):
        data = request.data
        serializer = CompanySerializer(data=data)  # Creating a serializer instance with the data from the request


        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Company Registered Successfully", safe=False)     
        return Response({"message": "Failed to Register Company", "errors": serializer.errors}, status=400) 
    
    def put(self, request, pk =None):
        Company_to_update = Company.objects.get(registration_number=pk)
        serializer = CompanySerializer(instance=Company_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Company Details Updated Successfully", safe=False)
        return Response({"message": "Failed to Update Company", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST) 
    
    def delete(self, request, pk=None):
        Company_to_delete = Company.objects.get(registration_number=pk)
        Company_to_delete.delete()
        return JsonResponse("Company Deleted Successfully", safe=False)
    

class EmployeeView(APIView):
        
        def get_employee(self, pk):
            try:
                return Employee.objects.get(employee_id_number=pk)
            except Employee.DoesNotExist:
                raise Http404
    
        def get(self, request, pk=None):
            if pk:
                data = self.get_employee(pk)
                serializer = EmployeeSerializer(data)
            else:
                data = Employee.objects.all()
                serializer = EmployeeSerializer(data, many=True)
    
            return Response(serializer.data)    
        
        def post(self, request):
            data = request.data
            serializer = EmployeeSerializer(data=data)  # Creating a serializer instance with the data from the request
    
            if serializer.is_valid():
                serializer.save()
                return JsonResponse("Employee Registered Successfully", safe=False)     
            return JsonResponse("Failed to Register Employee", safe=False) 
        
        def put(self, request, pk =None):
            Employee_to_update = Employee.objects.get(employee_id_number=pk)
            serializer = EmployeeSerializer(instance=Employee_to_update, data=request.data, partial=True)
    
            if serializer.is_valid():
                serializer.save()
                return JsonResponse("Employee Details Updated Successfully", safe=False)
            return JsonResponse("Failed to Update Employee Details", safe=False) 
        
        def delete(self, request, pk=None):
            try:
                employee_to_delete = Employee.objects.get(employee_id_number=pk)
                employee_to_delete.delete()
                return JsonResponse("Employee Deleted Successfully", safe=False)
            except Employee.DoesNotExist:
                 raise Http404("Employee does not exist")
            except Exception as e:
                  return JsonResponse(f"Failed to delete Employee: {str(e)}", status=500)
    


  