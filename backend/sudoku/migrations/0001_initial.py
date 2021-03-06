# Generated by Django 3.2.6 on 2021-08-16 14:45

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Puzzle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('difficulty', models.IntegerField(choices=[(1, 'Easy'), (2, 'Medium'), (3, 'Hard')], default=1)),
                ('board', django.contrib.postgres.fields.ArrayField(base_field=models.PositiveIntegerField(default=0), size=81)),
                ('solution', django.contrib.postgres.fields.ArrayField(base_field=models.PositiveIntegerField(default=0), size=81)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('puzzles_attempted', models.PositiveIntegerField(default=0)),
                ('puzzles_solved', models.PositiveIntegerField(default=0)),
                ('hints_given', models.PositiveIntegerField(default=0)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
