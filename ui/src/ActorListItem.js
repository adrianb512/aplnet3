export default function ActorsListItem(props) {
    return (
        <div>
            <div><li>
                <strong>{props.actor.name}</strong>
                {' '}
                <span>({props.actor.surname})</span>

                {' '}
                <a onClick={props.onDelete}>Delete</a>
            </li>
            </div>

        </div>
    );
}
