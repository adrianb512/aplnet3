import {useState} from "react";

export default function PrzypiszForm(props) {

    const [id_actor, setIdActor] = useState('');


    function addAktorToFilm(event) {
        event.preventDefault();
    const id_film = event.target.id_film.value;

        props.onPrzypiszSubmit({id_film, id_actor});

        setIdActor('');
    }

    return <form onSubmit={addAktorToFilm}>
        <h2>Przypisz aktora</h2>
        <div>
            <label>Tytuł</label>
            <input type="hidden" name="id_film" value={props.movie.id}/>
             {props.movie.title}
        </div>
         <div>
  <label>Aktor</label>
  <select
    value={id_actor}
    onChange={(e) => setIdActor(e.target.value)}
  >
    <option value="">-- wybierz aktora --</option>
    {props.actors.map(actor => (
      <option key={actor.id_actor} value={actor.id_actor}>
        {actor.name}
      </option>
    ))}
  </select>
</div>


        <button>{props.buttonLabel || 'Submit'}</button>
    </form>;
}
