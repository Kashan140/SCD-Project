# calculator/urls.py
from django.urls import path
from . import views
from .solar_calculations import calculate_solar_setup  # Import calculate_solar_setup view
from django.contrib import admin
from .views import save_user_data 

urlpatterns = [
    path('calculate_load/', views.calculate_load, name='calculate_load'),  # Load calculation
    path('calculate_solar_setup/', calculate_solar_setup, name='calculate_solar_setup'),  # Solar setup calculation
    path('admin/', admin.site.urls),
    path('save-user-data/', save_user_data),
]
