"""
transfer_course_serializer.py
Author: Snehitha Mamidi
Date: 03-01-2021
"""
from rest_framework import serializers
from transfer.models.model_transfer_course import TransferCourse


class transferCourseSerializer(serializers.ModelSerializer):
    """
    Transfer Course Serializer
    """
    class Meta:
        model = TransferCourse
        fields = ['transfer_course_id', 'school_id', 'subject_number',
                  'title', 'school']
