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
from rest_framework.exceptions import NotAuthenticated
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q

@receiver(user_registered)
def create_user_profile(user, request, **kwargs):
    new_profile =  Profile()
    new_profile.user = user
    new_profile.save()


def has_permission(request):
    print(request)
    if (request.user and
        request.user.is_authenticated):
        return True
    else:
        return False
#posts
@csrf_exempt
@api_view(['GET', 'POST'])
def posts(request):
    if request.method == 'GET':
        posts = []
        paginator = PageNumberPagination()
        paginator.page_size = 10
        if (request.query_params['order_by'] is not None and request.query_params['sort'] is not None and request.query_params['search'] is not None):
            search_q = request.query_params['search']
            if (request.query_params['sort'] == 'asc'):
                posts = Post.objects.filter(Q(title__icontains=search_q) | Q(post_id__icontains=search_q)).order_by(request.query_params['order_by'])
            elif (request.query_params['sort'] == 'desc'):
                posts = Post.objects.filter(Q(title__icontains=search_q) | Q(post_id__icontains=search_q)).order_by('-' + request.query_params['order_by'])
        
        result_page = paginator.paginate_queryset(posts, request)
        serialized_posts = PostSerializer(result_page, many=True, context={"request": request})
        return Response(serialized_posts.data)

    if request.method == 'POST':
        print(request.data)
        
        if has_permission(request):
            user = User.objects.get(pk=request.user.id)
            new_post = Post()
            new_post.user = user
            new_post.title = request.data['title']
            new_post.description = request.data['description']
            new_post.image = request.FILES.get('file')
            new_post.save()
            return Response()
        else:
            return Response('Unauthorized')

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

@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def create_post(request):
    if (request.method == 'POST'):
        #user = User.objects.get(pk=request.user.id)
        #new_post = Post()
        #new_post.user = user
        
        #new_post.save()
       # serialized_post = PostSerializer(new_post, context={"request": request})
        return Response(request.data)
        