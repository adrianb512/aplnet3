import './App.css';
import {useState,useEffect} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import ActorForm from "./ActorForm";
import MoviesList from "./MoviesList";
import PrzypiszForm from "./przypiszform";

 import React from 'react';

// npm instal
// npm start
function App() {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);
    const [addingActor, setAddingActor] = useState(false);
    const [actors, setActors] = useState([]);
        const [addPrzypisz, setPrzypisz] = useState(false);

useEffect(() => {
    const fetchMovies = async () => {
        const response = await fetch(`/movies`);
        if (response.ok) {
            const movies = await response.json();
            setMovies(movies);
        }
    };
    fetchMovies();
}, []);


useEffect(() => {
    const fetchActors = async () => {
        const response = await fetch(`/actors`);
        if (response.ok) {
            const actors = await response.json();
            setActors(actors);
        }
    };
    fetchActors();
}, []);




    async function handleAddMovie(movie) {
      const response = await fetch('/movies', {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
          const addingrespone = await response.json();
        movie.id=addingrespone.id;
        setMovies([...movies, movie]);
        setAddingMovie(false);
      }else
           alert('blad dodania');
}


 async function handleAddActor(actor) {
      const response = await fetch('/actors', {
        method: 'POST',
        body: JSON.stringify(actor),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
          const addingrespone = await response.json();
        actor.id_actor=addingrespone.id_actor;
        setActors([...actors, actor]);
        setAddingActor(false);
      }else
           alert('blad dodania');
}



    async function handleDeleteMovie(movie) {

            const confirmed = window.confirm(
      "Czy na pewno chcesz usunąć ten film?"
    );

    if (confirmed) {


      const response = await fetch(`/movies/${movie.id}`, {
        method: 'DELETE',

      });
      if (response.ok) {
      const nextMovies = movies.filter(m => m !== movie);
        setMovies(nextMovies);

      }

          }

}




    async function handleDeleteActor(actor) {

            const confirmed = window.confirm(
      "Czy na pewno chcesz usunąć ?"
    );

    if (confirmed) {


      const response = await fetch(`/actors/${actor.id_actor}`, {
        method: 'DELETE',

      });
      if (response.ok) {
      const nextActors = actors.filter(m => m !== actor);
        setActors(nextActors);

      }

          }

}


    async function handlePrzypisz(dane) {
      const response = await fetch('/przypisz', {
        method: 'POST',
        body: JSON.stringify(dane),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {

     alert('przypisano');

     setPrzypisz();

      }else
           alert('blad dodania');
}


    return (
        <div className="container">
            <h1>My favourite movies to watch</h1>
            {movies.length === 0
                ? <p>No movies yet. Maybe add something?</p>
                : <MoviesList movies={movies}
                              onDeleteMovie={(movie) => handleDeleteMovie(movie)}
                              onPrzypisz={(movie) => setPrzypisz(movie)}

                />}
            {addingMovie
                ? <MovieForm onMovieSubmit={handleAddMovie}
                             buttonLabel="Add a movie"
                />
                : <button onClick={() => setAddingMovie(true)}>Add a movie</button>}

                {addingActor
                ? <ActorForm onActorSubmit={handleAddActor} actors={actors}
                             buttonLabel="Actors" onDeleteActor={(actors) => handleDeleteActor(actors)}
                />
                : <button onClick={() => setAddingActor(true)}>Actors</button>}


              {addPrzypisz
                && <PrzypiszForm movie={addPrzypisz} actors={actors}
                                 onPrzypiszSubmit={(dane)=>handlePrzypisz(dane)}/>
                 }

        </div>
    );
}

export default App;
