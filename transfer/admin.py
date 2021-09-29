"""
admin.py
Author: Snehitha Mamidi
Created Date: 02-25-2021
Updated: 03-01-2021
"""
from django.contrib import admin
from transfer.models.model_school import School
from transfer.models.model_approver import Approver
from transfer.models.model_major import Major
from transfer.models.model_transfer_course import TransferCourse
from transfer.models.model_major_requirement import MajorRequirement
from transfer.models.model_transferevaluation import Transferevaluation

admin.site.register(School)
admin.site.register(Approver)
admin.site.register(Major)
admin.site.register(TransferCourse)
admin.site.register(MajorRequirement)
admin.site.register(Transferevaluation)
