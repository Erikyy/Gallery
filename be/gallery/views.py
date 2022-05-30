from cmath import log
from rest_framework.request import Request
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from gallery.models import Post, Profile, User
from gallery.serializers import NewPostSerializer, PostSerializer, ProfileSerializer, UserSerializer
from rest_framework.decorators import api_view, parser_classes, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from djoser.signals import user_registered
from django.dispatch import receiver
from rest_framework.exceptions import NotAuthenticated
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from rest_framework import generics

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
@api_view(['GET'])
def posts(request: Request):
    if request.method == 'GET':
        posts = []
        
        paginator = PageNumberPagination()
        paginator.page_size = 10
        print(request.query_params)
        if 'order_by' in request.query_params and 'sort' in request.query_params is not None and 'search' in request.query_params is not None:
            search_q = request.query_params['search']
            if (request.query_params['sort'] == 'asc'):
                posts = Post.objects.filter(Q(title__icontains=search_q) | Q(post_id__icontains=search_q)).order_by(request.query_params['order_by'])
            elif (request.query_params['sort'] == 'desc'):
                posts = Post.objects.filter(Q(title__icontains=search_q) | Q(post_id__icontains=search_q)).order_by('-' + request.query_params['order_by'])
            result_page = paginator.paginate_queryset(posts, request)
            serialized_posts = PostSerializer(result_page, many=True, context={"request": request})
            return Response(serialized_posts.data)
        else:
            return Response()

class CreatePost(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        f = open('request.txt', "w")
        for key, value in request.data.items():
            f.write(f"{key}, {value}")
        
        f.close()
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer: PostSerializer):
        user = User.objects.get(pk=self.request.user.id)
        print(user)
        serializer.save(user=user)
        
            
        
#post by id
@csrf_exempt
@api_view(['GET', 'POST'])
def post(request, id):
    if request.method == 'GET':
        post = Post.objects.get(post_id=id)
        serialized_post = PostSerializer(post, context={"request": request})
        return Response(serialized_post.data)
    elif request.method == 'POST':
        if has_permission(request):
            if (request.query_params['action']):
                post: Post = Post.objects.get(post_id=id)
                user: User = User.objects.get(pk=request.user.id)
                if request.query_params['action'] == 'like':
                    if post.dislikes.filter(pk=user.pk).exists():
                        post.dislikes.remove(user)
                    
                    if post.likes.filter(pk=user.pk).exists():
                        post.likes.remove(user)
                    else:
                        post.likes.add(user)

                elif request.query_params['action'] == 'dislike':
                    if post.likes.filter(pk=user.pk).exists():
                        post.likes.remove(user)
                    
                    if post.dislikes.filter(pk=user.pk).exists():
                        post.dislikes.remove(user)
                    else:
                        post.dislikes.add(user)
            return Response()


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
        