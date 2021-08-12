from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE
from django.contrib.postgres.fields import ArrayField
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=CASCADE)
    puzzles_attempted = models.PositiveIntegerField(default=0)
    puzzles_solved = models.PositiveIntegerField(default=0)
    hints_given = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return f"{self.user}"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class Puzzle(models.Model):
    DIFFICULTY_CHOICES = [
        (1, 'Easy'),
        (2, 'Medium'),
        (3, 'Hard'),
    ]

    difficulty = models.IntegerField(choices=DIFFICULTY_CHOICES, default=1)
    board = ArrayField(
        models.PositiveIntegerField(default=0), size=81
        )
    solution = ArrayField(
        models.PositiveIntegerField(default=0), size=81
        )

    def __str__(self):
        return f"{self.id}"