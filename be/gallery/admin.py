from django.contrib import admin
from gallery.models import Post, Profile

class PostAdmin(admin.ModelAdmin):
    exclude = ('post_id')

# Register your models here.
admin.site.register(Post)
admin.site.register(Profile)