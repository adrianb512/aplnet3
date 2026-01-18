import ActorsListItem from "./ActorListItem";

export default function ActorsList(props) {
    return <div>
        <h2>Actors</h2>
        <ul className="actors-list">
            {props.actors.map(actor =>
                <ActorsListItem actor={actor} onDelete={() => props.onDeleteActor(actor)} />
            )}
        </ul>
    </div>;
}
