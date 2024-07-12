
from django.urls import path
from .views import CompanyView
from .views import EmployeeView

urlpatterns = [
    path('Company/', CompanyView.as_view()),
    path('Company/<str:pk>/', CompanyView.as_view()),
    path('Employee/', EmployeeView.as_view()),
    path('Employee/<str:pk>/', EmployeeView.as_view())
]