import {useState} from 'react'

export default function AddDeckForm(){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [flashcards, setFlashcards] = useState([])

    return (
        <div>
            <form id = 'add-deck-form'>
                <input 
                type = 'text'
                placeholder='Deck Title'
                onChange = {(e) => setTitle(e.target.value)} // two way data binding
                value = {title} />
                <input type = 'submit' value = 'Add New Deck' />
            </form>
        </div>
    )
}