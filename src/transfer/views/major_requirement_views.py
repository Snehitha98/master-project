"""
major_requirement_views.py
Author: Snehitha Mamidi
Date: 03-17-2021
"""
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from transfer.serializers.major_requirement_serializer import *


@api_view(['GET', 'POST', 'DELETE'])
def major_requirement_view(request):
    if request.method == 'GET':
        major_requirements = MajorRequirement.objects.all()

        major_requirement_serializer = majorRequirementSerializer(major_requirements, many=True)
        return JsonResponse(major_requirement_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        serializer = majorRequirementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'DELETE':
        count = MajorRequirement.objects.all().delete()
        return JsonResponse({'message': '{} Transfer courses were deleted successfully!'.format(count[0])},
                            status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def major_requirement_detail(request, major_req_id):
    try:
        major_requirement = MajorRequirement.objects.get(major_req_id=major_req_id)
    except MajorRequirement.DoesNotExist:
        return JsonResponse({'message': 'The transfer course does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = majorRequirementSerializer(major_requirement)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        serializer = majorRequirementSerializer(major_requirement, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        major_requirement.delete()
        return JsonResponse({'message': 'Transfer Course was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
