"""
school_serializer.py
Author: Snehitha Mamidi
Date: 02-25-2021
"""
from rest_framework import serializers
from transfer.models.model_school import School

class schoolSerializer(serializers.ModelSerializer):
    """
    SchoolSerializer
    """
    class Meta:
        """
        Define the fields that gets serialized
        """
        model = School
        fields = '__all__'
