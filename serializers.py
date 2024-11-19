from rest_framework import serializers
from .models import UserData

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ['name', 'mobile']
        
class CalculationSerializer(serializers.Serializer):
    budget = serializers.FloatField()
    house_size = serializers.FloatField()
    sunlight = serializers.CharField()
    appliances = serializers.ListField(child=serializers.DictField())
