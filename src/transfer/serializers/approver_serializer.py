"""
approver_serializer.py
Author: Snehitha Mamidi
Date: 02-25-2021
"""
from rest_framework import serializers
from transfer.models.model_approver import Approver


class approverSerializer(serializers.ModelSerializer):
    """
    Approver Serializer
    """
    class Meta:
        """
        Define the fields that gets serialized
        """
        model = Approver
        fields = '__all__'
