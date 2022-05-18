from datetime import datetime
from functools import partial
from django.db import models
from django.contrib.auth.models import User
from nanoid import generate

def get_folder(instance, filename):
    return "media/%s/%s" % (instance.user, filename)

def gen_post_id():
    return generate(size=10)

class Post(models.Model):
    title = models.CharField("title", max_length=200)
    description = models.TextField(max_length=500, default="")
    post_image = models.ImageField(blank=False, upload_to=get_folder, default='media/default.jpg')
    created_at = models.DateTimeField("created_at", default=datetime.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    post_id = models.CharField(max_length=15, default=gen_post_id, unique=True)

    def __str__(self) -> str:
        return self.title

    def image(self):
        return self.image 

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to=get_folder, default='media/default.jpg', blank=True)
    

    def __str__(self) -> str:
        return self.user.username