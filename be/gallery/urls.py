from django.urls import path, include
from gallery import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('posts/', views.posts),
    path('posts/<str:id>', views.post),
    path('users/', views.users),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)