export default function MovieListItem(props) {
    return (
        <div>
            <div>
                <strong>{props.movie.title}</strong>
                {' '}
                <span>({props.movie.year})</span>
                {' '}
                actors: {props.movie.actors}
                {' '}
                <a onClick={props.onDelete}>Delete</a>
                 {' '}
                <a onClick={props.onPrzypisz}>Przypiszaktora</a>

            </div>
            {props.movie.description}
        </div>
    );
}
