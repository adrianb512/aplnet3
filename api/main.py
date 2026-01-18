from fastapi import FastAPI, Body
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Any
import sqlite3


class Movie(BaseModel):
    title: str
    year: str


class Actor(BaseModel):
    name: str
    surname: str

class Dane(BaseModel):
        id_film: int
        id_actor: int


##python -m pip install -r requirements.txt
##python -m fastapi dev main.py
app = FastAPI()

app.mount("/static", StaticFiles(directory="../ui/build/static", check_dir=False), name="static")

@app.get("/")
def serve_react_app():
   return FileResponse("../ui/build/index.html")

@app.get('/movies')
def get_movies():
    db = sqlite3.connect('movies.db')
    cursor = db.cursor()

    movies = cursor.execute("""
    SELECT
        f.id,
        f.title,
        f.year,
        COALESCE(
            GROUP_CONCAT(a.name || ' ' || a.surname, ', '),
            ''
        ) AS actors
    FROM movies AS f
    LEFT JOIN actor_to_movie AS b ON f.id = b.id_movie
    LEFT JOIN actors AS a ON b.id_actor = a.id_actor
    GROUP BY f.id
    ORDER BY f.id;
    """)

    output = []
    for movie in movies:
        output.append({
            'id': movie[0],
            'title': movie[1],
            'year': movie[2],
            'actors': movie[3]
        })

    return output


@app.get('/movies/{movie_id}')
def get_single_movie(movie_id:int):  # put application's code here
    db = sqlite3.connect('movies.db')
    cursor = db.cursor()
    movie = cursor.execute(f"SELECT * FROM movies WHERE id={movie_id}").fetchone()
    if movie is None:
        return {'message': "Movie not found"}
    return {'title': movie[1], 'year': movie[2], 'actors': movie[3]}

@app.post("/movies")
def add_movie(movie: Movie):
    db = sqlite3.connect('movies.db')
    cursor = db.cursor()
    cursor.execute(f"INSERT INTO movies (title, year) VALUES ('{movie.title}', '{movie.year}')")
    db.commit()
    return {"id":cursor.lastrowid, "message": f"Movie with id = {cursor.lastrowid} added successfully"}
    # movie = models.Movie.create(**movie.dict())
    # return movie

@app.put("/movies/{movie_id}")
def update_movie(movie_id:int, params: dict[str, Any]):
    db = sqlite3.connect('movies.db')
    cursor = db.cursor()
    cursor.execute(
    "UPDATE movies SET title = ?, year = ?, actors = ? WHERE id = ?",
    (params['title'], params['year'], params['actors'], movie_id)
    )
    db.commit()
    if cursor.rowcount == 0:
        return {"message": f"Movie with id = {movie_id} not found"}
    return {"message": f"Movie with id = {cursor.lastrowid} updated successfully"}

@app.delete("/movies/{movie_id}")
def delete_movie(movie_id:int):
    db = sqlite3.connect('movies.db')
    cursor = db.cursor()
    cursor.execute("DELETE FROM movies WHERE id = ?", (movie_id,))
    db.commit()
    if cursor.rowcount == 0:
        return {"message": f"Movie with id = {movie_id} not found"}
    return {"message": f"Movie with id = {movie_id} deleted successfully"}

@app.delete("/movies")
def delete_movies(movie_id:int):
    db = sqlite3.connect('movies.db')
    cursor = db.cursor()
    cursor.execute("DELETE FROM movies")
    db.commit()
    return {"message": f"Deleted {cursor.rowcount} movies"}







@app.get('/actors')
def get_actors():  # put application's code here
    db = sqlite3.connect('movies.db')
    cursor = db.cursor()
    actors = cursor.execute('SELECT * FROM actors')

    output = []
    for actor in actors:
         actor = {'id_actor': actor[0], 'name': actor[1], 'surname': actor[2]}
         output.append(actor)
    return output

@app.get('/actors/{actors_id}')
def get_single_actor(actors_id:int):  # put application's code here
    db = sqlite3.connect('movies.db')
    cursor = db.cursor()
    actor = cursor.execute(f"SELECT * FROM actors WHERE Id_actor={actors_id}").fetchone()
    if actor is None:
        return {'message': "actor not found"}
    return {'Id_actor': actor[0], 'name': actor[1], 'surname': actor[2]}

@app.post("/actors")
def add_actor(actor: Actor):
    db = sqlite3.connect('movies.db')
    cursor = db.cursor()
    cursor.execute(f"INSERT INTO actors (name, surname) VALUES ('{actor.name}', '{actor.surname}')")
    db.commit()
    return {"id_actor":cursor.lastrowid, "message": f" aktor with id = {cursor.lastrowid} added successfully"}
    # movie = models.Movie.create(**movie.dict())
    # return movie


@app.delete("/actors/{actor_id}")
def delete_actor(actor_id:int):
    db = sqlite3.connect('movies.db')
    cursor = db.cursor()
    cursor.execute("DELETE FROM actors WHERE id_actor = ?", (actor_id,))
    db.commit()
    if cursor.rowcount == 0:
        return {"message": f"actor  with id = {actor_id} not found"}
    return {"message": f"actor with id = {actor_id} deleted successfully"}


@app.post("/przypisz")
def add_actor(dane: Dane):
    db = sqlite3.connect('movies.db')
    cursor = db.cursor()
    cursor.execute(f"INSERT INTO actor_to_movie (id_movie, id_actor) VALUES ('{dane.id_film}', '{dane.id_actor}')")
    db.commit()
    return {"id_actor":cursor.lastrowid, "message": f" aktor with id = {cursor.lastrowid} added successfully"}
    # movie = models.Movie.create(**movie.dict())
    # return movie


# if __name__ == '__main__':
#     app.run()
