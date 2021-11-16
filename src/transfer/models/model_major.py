"""
model_major.py
Author: Snehitha Mamidi
Date: 03-01-2021
"""
from django.db import models


class Major(models.Model):
    """
    Major data model
    """
    major_id = models.AutoField(primary_key=True)
    major_name = models.CharField(max_length=200, unique=True, default=None)

    def __str__(self):
        return self.major_name
