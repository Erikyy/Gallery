from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from gallery.models import Post, Profile, User
from gallery.serializers import PostSerializer, ProfileSerializer, UserSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response

@csrf_exempt
@api_view(['GET'])
def posts(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        serialized_posts = PostSerializer(posts, many=True, context={"request": request})
        return Response(serialized_posts.data)

@csrf_exempt
@api_view(['GET'])
def post(request, id):
    if request.method == 'GET':
        post = Post.objects.get(post_id=id)
        serialized_post = PostSerializer(post, context={"request": request})
        return Response(serialized_post.data)

@csrf_exempt
@api_view(['GET'])
def users(request):
    if request.method == 'GET':
        users = Profile.objects.all()
        serialized_users = ProfileSerializer(users, many=True, context={"request": request})
        return Response(serialized_users.data)