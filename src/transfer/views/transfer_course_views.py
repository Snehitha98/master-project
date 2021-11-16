from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from transfer.serializers.transfer_course_serializer import *


@api_view(['GET', 'POST', 'DELETE'])
def transfer_course_view(request):
    if request.method == 'GET':
        transfercourses = TransferCourse.objects.all()

        transfer_course_serializer = transferCourseSerializer(transfercourses, many=True)
        return JsonResponse(transfer_course_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        serializer = transferCourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'DELETE':
        count = TransferCourse.objects.all().delete()
        return JsonResponse({'message': '{} Transfer courses were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def transfer_course_detail(request, transfer_course_id):
    try:
        transfer_course = TransferCourse.objects.get(transfer_course_id=transfer_course_id)
    except TransferCourse.DoesNotExist:
        return JsonResponse({'message': 'The transfer course does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = transferCourseSerializer(transfer_course)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        serializer = transferCourseSerializer(transfer_course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        transfer_course.delete()
        return JsonResponse({'message': 'Transfer Course was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
