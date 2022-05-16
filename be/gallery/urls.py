from django.urls import path, include, re_path
from gallery import views
from django.conf import settings

urlpatterns = [
    re_path(r'^posts$', views.posts),
    path('posts/<str:id>', views.post),
    path('users/', views.users),
    path('users/me/', views.me)
]

