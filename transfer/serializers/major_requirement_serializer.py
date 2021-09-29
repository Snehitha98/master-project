"""
major_requirement_serializer.py
Author: Snehitha Mamidi
Date: 03-02-2021
"""
from rest_framework import serializers
from transfer.models.model_major_requirement import MajorRequirement


class majorRequirementSerializer(serializers.ModelSerializer):
    """
    Major Requirement Serializer
    """
    class Meta:
        """
        Define the fields that gets serialized
        """
        model = MajorRequirement
        fields = ['major_req_id', 'description', 'major_id', 'major']
