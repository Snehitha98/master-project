from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .load import *



@api_view(['POST'])
def FileUploadView(request):
    import_data(request.data['file'])
    return Response(None, status=status.HTTP_201_CREATED)
