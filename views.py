from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import UserData
from .serializers import UserDataSerializer
import json
from django.http import JsonResponse

@api_view(['POST'])
# Temporarily exempt CSRF for testing (you should handle CSRF properly in production)
def save_user_data(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)  # Parse the incoming JSON data
            name = data.get('name')          # Get the name from the data
            mobile = data.get('mobile')      # Get the mobile from the data

            # Save the data in the UserData model (calculator_userdata table)
            UserData.objects.create(name=name, mobile=mobile)

            return JsonResponse({'success': True, 'message': 'Data saved successfully!'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
    else:
        return JsonResponse({'success': False, 'message': 'Only POST requests are allowed.'}, status=405)
@api_view(['POST'])
def calculate_load(request):
    try:
        # Get the list of appliances from the request data
        appliances = request.data.get('appliances', [])
        
        # Calculate total load
        total_load = sum(int(appliance['watts']) * int(appliance['quantity']) for appliance in appliances)

        # Return the total load as a JSON response
        return Response({'totalLoad': total_load}, status=status.HTTP_200_OK)
    except Exception as e:
        # Return an error message as a JSON response
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
