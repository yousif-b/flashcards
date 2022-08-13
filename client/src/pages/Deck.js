import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import AddFlashcardForm from "../components/AddFlashcardForm"
import Flashcard from "../components/Flashcard"
import FullFlashcard from "../components/FullFlashcard"

export default function Deck(){
    const [deckTitle, setDeckTitle] = useState('')
    const [flashcards, setFlashcards] = useState(null)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [index, setIndex] = useState(0)
    const params = useParams()

    useEffect(() => {
        fetch('http://localhost:4000/' + params.id)
        .then(response => response.json())
        .then(data => handleDeckData(data))
    }, [params.id])

    function handleDeckData(data){
        setDeckTitle(data.title)
        setData(data.flashcards)
        let arr = []
        data.flashcards.map(flashcard => {
            arr.push(<Flashcard key = {flashcard._id} flashcard = {flashcard} />)
        })
        setFlashcards(arr)
        setLoading(false)
    }

    function increment(){
        if(index+1 !== flashcards.length) setIndex(index+1)
    }

    function decrement(){
        if(index !== 0) setIndex(index-1)
    }

    return (
        <div className = 'page'>
            <AddFlashcardForm deckId = {params.id} deckTitle = {deckTitle}/>
            {loading || !flashcards ? (<div>loading... </div>) : (flashcards[index])}
            <div className='flashcard-btns'>
                <button onClick = {decrement}>Left</button>
                {<p>{index}</p>}
                <button onClick = {increment}>Right</button>
            </div>
            <div className = 'flashcard-list'>
                {loading || !flashcards ? (<div>loading... </div>) : (
                    data.map(flashcard => (
                        <FullFlashcard key = {flashcard._id} flashcard = {flashcard} deckId = {params.id}/>
                    ))
                )}
            </div>
        </div>
    )
}