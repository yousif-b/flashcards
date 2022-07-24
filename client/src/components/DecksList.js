import {useEffect, useState} from 'react'
import DeckPreview from './DeckPreview'

export default function DecksList(){
    const [decks, setDecks] = useState(null)

    useEffect(() => {
        fetch('http://localhost:4000/')
        .then(response => response.json())
        .then(data => setDecks(data))
    }, [])
    
    return(
        <div>
            <h1>Deck List: </h1>
            <div className = 'deck-list'>
                {decks && decks.map((deck) => (
                <DeckPreview key = {deck._id} deck = {deck}/>
                ))}
            </div>
        </div>
    )
}