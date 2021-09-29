from django.shortcuts import render

from ..models.model_approver import Approver
from ..models.model_major import Major
from ..models.model_major_requirement import MajorRequirement
from ..models.model_school import School
from ..models.model_transfer_course import TransferCourse
from ..models.model_transferevaluation import Transferevaluation


def remove_all_data(request):

    if request.method == "POST":
        Major.objects.all().delete()
        School.objects.all().delete()
        TransferCourse.objects.all().delete()
        MajorRequirement.objects.all().delete()
        Transferevaluation.objects.all().delete()
        Approver.objects.all().delete()
    return render(request, 'removeall.html')
