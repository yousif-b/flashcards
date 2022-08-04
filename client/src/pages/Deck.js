import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import AddFlashcardForm from "../components/AddFlashcardForm"
import Flashcard from "../components/Flashcard"

export default function Deck(){
    const [deckTitle, setDeckTitle] = useState('')
    const [flashcards, setFlashcards] = useState(null)
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
        let arr = []
        data.flashcards.map((flashcard, index) => {
            arr.push(<Flashcard key = {index} flashcard = {flashcard} />)
        })
        setFlashcards(arr)
        console.log(arr)
        setLoading(false)
    }

    function increment(){
        if(index+1 !== flashcards.length){
            setIndex(index+1)
        }
    }

    function decrement(){
        if(index !== 0){
            setIndex(index-1)
        }
    }

    return (
        <div>
            <h2>Deck</h2>
            <h2>{deckTitle}</h2>
            <AddFlashcardForm deckId = {params.id} />
            {loading || !flashcards ? (<div>loading... </div>) : (flashcards[index])}
            <button onClick = {decrement}>Left</button>
            <button onClick = {increment}>Right</button>
        </div>
    )
}