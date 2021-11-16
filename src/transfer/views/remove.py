from django.shortcuts import render
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .load import *
from rest_framework import viewsets
from ..serializers import *
from transfer.models.model_major_requirement import MajorRequirement
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import status
from ..models.model_major import Major
from ..models.model_school import School
from ..models.model_transfer_course import TransferCourse
from ..models.model_major_requirement import MajorRequirement
from ..models.model_transferevaluation import Transferevaluation
from ..models.model_approver import Approver


@api_view(['POST'])
def RemoveDataView(request):
    Major.objects.all().delete()
    School.objects.all().delete()
    TransferCourse.objects.all().delete()
    MajorRequirement.objects.all().delete()
    Transferevaluation.objects.all().delete()
    Approver.objects.all().delete()
    return Response(None, status=status.HTTP_201_CREATED)