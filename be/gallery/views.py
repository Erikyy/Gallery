from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from gallery.models import Post, Profile, User
from gallery.serializers import PostSerializer, ProfileSerializer, UserSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from djoser.signals import user_registered
from django.dispatch import receiver

@receiver(user_registered)
def create_user_profile(user, request, **kwargs):
    new_profile =  Profile()
    new_profile.user = user
    new_profile.save()


#posts
@csrf_exempt
@api_view(['GET'])
def posts(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        serialized_posts = PostSerializer(posts, many=True, context={"request": request})
        return Response(serialized_posts.data)

#post by id
@csrf_exempt
@api_view(['GET'])
def post(request, id):
    if request.method == 'GET':
        post = Post.objects.get(post_id=id)
        serialized_post = PostSerializer(post, context={"request": request})
        return Response(serialized_post.data)

#all users
@csrf_exempt
@api_view(['GET'])
def users(request):
    if request.method == 'GET':
        users = Profile.objects.all()
        serialized_users = ProfileSerializer(users, many=True, context={"request": request})
        return Response(serialized_users.data)

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    if (request.method == 'GET'):
        user = User.objects.get(pk=request.user.id)
        profile = Profile.objects.get(user=user)
        serialized_profile = ProfileSerializer(profile, context={"request": request})
        print(request.user.id)
        return Response(serialized_profile.data)