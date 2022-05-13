from django.urls import path, include
from gallery import views
from django.conf import settings


urlpatterns = [
    path('posts/', views.posts),
    path('posts/<str:id>', views.post),
    path('users/', views.users),
    path('users/me/', views.me)
]

