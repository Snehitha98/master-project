"""
major_serializer.py
Author: Snehitha Mamidi
Date: 03-01-2021
"""
from rest_framework import serializers
from transfer.models.model_major import Major


class majorSerializer(serializers.ModelSerializer):
    """
    Major Serializer
    """
    class Meta:
        """
        Define the fields that gets serialized
        """
        model = Major
        fields = '__all__'
