"""
approver_views.py
Author: Snehitha Mamidi
Date: 03-11-2021
"""
from rest_framework import viewsets
from transfer.serializers.approver_serializer import *
from transfer.models.model_approver import Approver
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import status


@api_view(['GET', 'POST', 'DELETE'])
def approver_view(request):
    if request.method == 'GET':
        approvers = Approver.objects.all()
        approver_serializer = approverSerializer(approvers, many=True)
        return JsonResponse(approver_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        serializer = approverSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = Approver.objects.all().delete()
        return JsonResponse({'message': '{} approvers were deleted successfully!'.format(count[0])},
                            status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def approver_detail(request, approver_id):
    try:
        approver = Approver.objects.get(approver_id=approver_id)
    except Approver.DoesNotExist:
        return JsonResponse({'message': 'The approver does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        approver_serializer = approverSerializer(approver)
        return JsonResponse(approver_serializer.data)

    elif request.method == 'PUT':
        approver_serializer = approverSerializer(approver, data=request.data)
        if approver_serializer.is_valid():
            approver_serializer.save()
            return JsonResponse(approver_serializer.data)
        return JsonResponse(approver_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        approver.delete()
        return JsonResponse({'message': 'Approver was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
