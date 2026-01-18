import React, {useState} from "react";
import ActorsList from "./ActorsList";



export default function ActorForm(props) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [actors, setActors] = useState([]);

    function addActor(event) {
        event.preventDefault();
        if (name.length < 5) {
            return alert('Imie jest za krótki');
        }

          if (surname.length < 5) {
            return alert('Nazwisko jest za krótki');
        }

        props.onActorSubmit({name, surname});
        setName('');
        setSurname('');
    }

    return <form onSubmit={addActor}>

               {
                <ActorsList actors={props.actors} onDeleteActor={(actor) => props.onDeleteActor(actor)} />}


        <h2>Add Actor</h2>
        <div>
            <label>Imie</label>
            <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
        </div>
        <div>
            <label>Nazwisko</label>
            <input type="text" value={surname} onChange={(event) => setSurname(event.target.value)}/>
        </div>
        <button>{props.buttonLabel || 'Submit'}</button>
    </form>;
}
