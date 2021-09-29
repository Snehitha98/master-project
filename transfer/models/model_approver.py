"""
model_approver.py
Author: Snehitha Mamidi
Date: 03-01-2021
"""
from django.db import models


class Approver(models.Model):
    """
    Approver data model
    """
    approver_id = models.AutoField(primary_key=True)
    approver_name = models.CharField(max_length=200, blank=True, null=False, unique=True)

    def __str__(self):
        return self.approver_name
