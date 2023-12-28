from django.urls import path

from accounts.api import UserRetrieve


urlpatterns = [
    path('users/me/', UserRetrieve.as_view(), name='user'),
]

