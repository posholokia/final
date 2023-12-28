from django.contrib.auth import get_user_model
from rest_framework import permissions, viewsets, generics, status
from .serializers import UserSerializer
from rest_framework.response import Response

User = get_user_model()


class UserRetrieve(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        user = request.user
        return Response(data=self.serializer_class(user).data, status=status.HTTP_200_OK)
