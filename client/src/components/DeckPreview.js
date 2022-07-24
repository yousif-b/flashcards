export default function DeckPreview(props){
    return(
        <div>
            <h3>{props.deck.title}</h3>
            <p>{props.deck.flashcards.length}</p>
        </div>
    )
}