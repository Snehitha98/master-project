"""
model_transferevaluation.py
Author: Snehitha Mamidi
Date: 03-02-2021
"""
from django.db import models
from .model_transfer_course import TransferCourse
from .model_major_requirement import MajorRequirement
from .model_approver import Approver


class Transferevaluation(models.Model):
    """
    Transfer Evaluation data model
    """
    approver_choices = (('Y', 'Yes'), ('N', 'No'))
    transfer_eval_id = models.AutoField(primary_key=True)
    transfer_course_id = models.ForeignKey(TransferCourse, on_delete=models.CASCADE)
    major_req_id = models.ForeignKey(MajorRequirement, on_delete=models.CASCADE)
    sem_year_taken = models.CharField(max_length=8, blank=True, null=True)
    expiration_date = models.DateField(blank=True, null=True)  # It must be in YYYY-MM-DD format
    approved_status = models.CharField(max_length=1, choices=approver_choices, null=True)
    notes = models.CharField(max_length=150, blank=True, null=True)
    approver_id = models.ForeignKey(Approver, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('transfer_course_id', 'major_req_id')

    def __str__(self):
        return self.transfer_eval_id

    def major(self):
        return str(self.major_req_id.major_id)

    def major_id(self):
        return str(self.major_req_id.major_id.major_id)

    def school(self):
        return str(self.transfer_course_id.school_id.school_name)

    def school_id(self):
        return str(self.transfer_course_id.school_id.school_id)

    def course_number(self):
        return str(self.transfer_course_id.subject_number)

    def course_title(self):
        return str(self.transfer_course_id)

    def unhm_eq(self):
        return str(self.major_req_id.description)

    def approver(self):
        return str(self.approver_id)
