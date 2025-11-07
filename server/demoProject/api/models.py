from django.db import models

# Create your models here.

class Movie(models.Model):
    tmdb_id = models.IntegerField(unique=True)  # TMDB movie ID
    title = models.CharField(max_length=255)
    original_title = models.CharField(max_length=255, blank=True)
    overview = models.TextField(blank=True)
    release_date = models.DateField(null=True, blank=True)
    poster_path = models.CharField(max_length=500, blank=True)
    backdrop_path = models.CharField(max_length=500, blank=True)
    popularity = models.FloatField(default=0)
    vote_average = models.FloatField(default=0)
    vote_count = models.IntegerField(default=0)
    adult = models.BooleanField(default=False)
    original_language = models.CharField(max_length=10, blank=True)
    genre_ids = models.JSONField(default=list)  
    
    def __str__(self):
        return self.title
    

