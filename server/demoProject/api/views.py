from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Movie
from .serializer import MovieSerializer
import requests

@api_view(['GET'])
def get_movies(request):
    API_KEY = "3f0c76ba6e1202b32ed725654ca34b9f"
    BASE_URL = "https://api.themoviedb.org/3/discover/movie"
    page = int(request.GET.get("page", 1))  # default page 1

    params = {
        "include_adult": "false",
        "include_video": "false",
        "language": "en-US",
        "page": page,
        "sort_by": "popularity.desc",
        "api_key": API_KEY,
    }
    response = requests.get(BASE_URL, params=params)

    if response.status_code != 200:
        return Response({"error": "Failed to fetch movies"}, status=response.status_code)

    data = response.json()
    
    if isinstance(data, dict) and "results" in data:
        return Response(data["results"])
    elif isinstance(data, list):
        return Response(data)
    else:
        return Response({"error": "Unexpected response format"}, status=500)

@api_view(['POST'])

def create_movie(request):
    tmdb_id = request.data.get("tmdb_id")
    if tmdb_id is None : 
        return Response({"detail": "tmdb_id is required"}, status=400)
    obj, created = Movie.objects.get_or_create(
            tmdb_id=tmdb_id,
            defaults={
                "original_title": request.data.get("original_title", ""),
                "overview": request.data.get("overview", ""),
                "release_date": request.data.get("release_date") or None,
                "poster_path": request.data.get("poster_path", ""),
                "backdrop_path": request.data.get("backdrop_path", ""),
                "popularity": request.data.get("popularity", 0) or 0,
                "vote_average": request.data.get("vote_average", 0) or 0,
                "vote_count": request.data.get("vote_count", 0) or 0,
                "adult": bool(request.data.get("adult", False)),
                "original_language": request.data.get("original_language", ""),
            },
        )
      
    if not created:
        for field in [
            "title","original_title","overview","release_date",
            "poster_path","backdrop_path","popularity","vote_average",
            "vote_count","adult","original_language","genre_ids"
        ]:
            if field in request.data and request.data[field] not in [None, ""]:
                setattr(obj, field, request.data[field])
        obj.save()

    data = MovieSerializer(obj).data
    return Response(data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


@api_view(["GET"])
def list_saved_movies(request):
    movies = Movie.objects.all().order_by("-id")  # newest first
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
def delete_listing(request):
    tmdb_id = request.query_params.get("tmdb_id")
    if tmdb_id is None : 
        return Response({"detail": "tmdb_id is required"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        movie = Movie.objects.get(tmdb_id=tmdb_id)
        movie.delete()
        return Response({"detail": "Movie deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Movie.DoesNotExist:
        return Response({"detail": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)