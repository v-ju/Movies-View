from django.urls import path
from .views import get_movies,create_movie,list_saved_movies,delete_listing


urlpatterns = [
    path('movie/', get_movies, name='get_movies'),
    path('movies/add/', create_movie, name='create_movie'),
    path("movies/list/", list_saved_movies, name="list_movies"),
    path("movies/delete/", delete_listing, name="delete_movie")
]