# Generated by Django 4.0.4 on 2022-05-10 22:15

from django.db import migrations, models
import gallery.models


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0003_remove_post_rating_post_dislikes_post_likes'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='post_image',
            field=models.ImageField(default='default.jpg', upload_to=gallery.models.get_folder),
        ),
    ]