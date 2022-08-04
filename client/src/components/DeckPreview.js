import { Link } from "react-router-dom";

export default function DeckPreview(props){
    return(
        <Link to= {'/deck/' + props.deck._id}>
            <div>
                <h3>{props.deck.title}</h3>
                <p>{props.deck.flashcards.length}</p>
            </div>
        </Link>
    )
}