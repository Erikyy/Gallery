from django.conf import settings
from rest_framework import serializers
from gallery.models import Post, Profile
from django.contrib.auth.models import User
import jwt

class UserSerializer(serializers.ModelSerializer):
    #posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'username']

class NewPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('title', 'description', 'post_image')

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    #post_image_url = serializers.SerializerMethodField()
    number_of_likes = serializers.SerializerMethodField()
    number_of_dislikes = serializers.SerializerMethodField()
    has_liked = serializers.SerializerMethodField()
    has_disliked = serializers.SerializerMethodField()

    class Meta:
       model = Post
       fields = ['title', 'created_at', 'post_image', 'post_id', 'description', 'number_of_likes', 'number_of_dislikes', 'user', 'has_liked', 'has_disliked']

    def get_post_image_url(self, post):
        request = self.context.get('request')
        post_image_url = post.post_image.url
        return request.build_absolute_uri(post_image_url)

    def get_number_of_likes(self, post: Post):
        request = self.context.get('request')
        return post.number_of_likes()

    def get_number_of_dislikes(self, post: Post):
        request = self.context.get('request')
        return post.number_of_dislikes()

    def get_has_liked(self, post: Post):
        request = self.context.get('request')
        if request.user.id is not None:
            
            user = User.objects.get(pk=request.user.id)
            return post.has_liked(user)
        elif request.META.get('HTTP_TOKEN') is not None:
            if request.META.get('HTTP_TOKEN') != 'undefined':
                payload = jwt.decode(request.META.get('HTTP_TOKEN'), settings.SECRET_KEY, algorithms=['HS256'], options={"verify_signature": False})
                user_id = payload['user_id']
                user = User.objects.get(pk=user_id)
                return post.has_liked(user)
            else:
                return False
        else:
            return False

    def get_has_disliked(self, post: Post):
        request = self.context.get('request')
        
        if request.user.id is not None:
            
            user = User.objects.get(pk=request.user.id)
            return post.has_disliked(user)
        elif request.META.get('HTTP_TOKEN') is not None:
            if request.META.get('HTTP_TOKEN') != 'undefined':
                payload = jwt.decode(request.META.get('HTTP_TOKEN'), settings.SECRET_KEY, algorithms=['HS256'], options={"verify_signature": False})
                user_id = payload['user_id']
                user = User.objects.get(pk=user_id)
                return post.has_disliked(user)
            else:
                return False
        else:
            return False

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    profile_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['id', 'user', 'profile_image_url']
    
    def get_profile_image_url(self, profile):
        request = self.context.get('request')
        profile_image_url = profile.profile_image.url
        return request.build_absolute_uri(profile_image_url)
