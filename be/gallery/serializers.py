from rest_framework import serializers
from gallery.models import Post, Profile
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    #posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'username']

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    post_image_url = serializers.SerializerMethodField()

    class Meta:
       model = Post
       fields = ['title', 'created_at', 'post_image_url', 'post_id', 'description', 'likes', 'dislikes', 'user']

    def get_post_image_url(self, post):
        request = self.context.get('request')
        post_image_url = post.post_image.url
        return request.build_absolute_uri(post_image_url)

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
