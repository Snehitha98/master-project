"""
model_school.py
Author: Snehitha Mamidi
Date: 02-25-2021
"""
from django.db import models


class School(models.Model):
    """
    School data model
    """
    school_id = models.AutoField(primary_key=True)
    school_name = models.CharField(max_length=100, unique=True)
    state_name = models.CharField(max_length=10, null=True)

    def __str__(self):
        return self.school_name
