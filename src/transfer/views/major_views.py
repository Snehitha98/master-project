"""
major_views.py
Author: Snehitha Mamidi
Date: 03-11-2021
"""
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from transfer.serializers.major_serializer import *


@api_view(['GET', 'POST', 'DELETE'])
def major_view(request):
    if request.method == 'GET':
        majors = Major.objects.all()

        major_serializer = majorSerializer(majors, many=True)
        return JsonResponse(major_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        serializer = majorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'DELETE':
        count = Major.objects.all().delete()
        return JsonResponse({'message': '{} majors were deleted successfully!'.format(count[0])},
                            status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def major_detail(request, major_id):
    try:
        major = Major.objects.get(major_id=major_id)
    except Major.DoesNotExist:
        return JsonResponse({'message': 'The major does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        major_serializer = majorSerializer(major)
        return JsonResponse(major_serializer.data)

    elif request.method == 'PUT':
        serializer = majorSerializer(major, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        major.delete()
        return JsonResponse({'message': 'Major was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
