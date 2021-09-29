"""
transfer_evaluation_views.py
Author: Snehitha Mamidi
Date: 03-17-2021
"""
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from transfer.serializers.transferevaluation_serializer import *


@api_view(['GET', 'POST'])
def transfer_evaluation_view(request):
    if request.method == 'GET':
        transfer_evaluations = Transferevaluation.objects.all()

        serializer = transferEvaluationSerializer(transfer_evaluations, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        serializer = transferEvaluationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def transfer_evaluation_detail(request, transfer_eval_id):
    try:
        transfer_evaluation = Transferevaluation.objects.get(transfer_eval_id=transfer_eval_id)
    except Transferevaluation.DoesNotExist:
        return JsonResponse({'message': 'The transfer evaluation does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = transferEvaluationSerializer(transfer_evaluation)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        serializer = transferEvaluationSerializer(transfer_evaluation, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        transfer_evaluation.delete()
        return JsonResponse({'message': 'Transfer evaluation was deleted successfully!'},
                            status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def transfer_evaluation(request, majorid):
    major = []

    major = Major.objects.filter(major_id=majorid)
    major_req = Major_requirement.objects.filter(major_id__in=major)

    for school_transfereval in school_transfereval:
        if {'name': school_transfereval.major(), 'id': school_transfereval.majorid()} not in major:
            major.append({'name': school_transfereval.major(), 'id': school_transfereval.majorid()})

    return JsonResponse(major, safe=False)
