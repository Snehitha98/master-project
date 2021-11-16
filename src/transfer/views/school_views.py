from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from transfer.models.model_school import School
from transfer.serializers.school_serializer import schoolSerializer


@api_view(['GET', 'POST'])
def school_view(request):
    if request.method == 'GET':
        schools = School.objects.all()

        school_serializer = schoolSerializer(schools, many=True)
        return JsonResponse(school_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        serializer = schoolSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def school_detail(request, school_id):
    try:
        school = School.objects.get(school_id=school_id)
    except School.DoesNotExist:
        return JsonResponse({'message': 'The school does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        school_serializer = schoolSerializer(school)
        return JsonResponse(school_serializer.data)

    elif request.method == 'PUT':
        serializer = schoolSerializer(school, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        school.delete()
        return JsonResponse({'message': 'School was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
