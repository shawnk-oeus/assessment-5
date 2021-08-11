from rest_framework import serializers
from .models import Profile, Puzzle

class PuzzleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Puzzle
        fields = ['id', 'difficulty', 'board', 'solution']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user', 'puzzles_attempted', 'puzzles_solved']