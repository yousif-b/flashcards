import {useState} from 'react'

export default function AddFlashcardForm(props){
    const [newFlashcardFront, setNewFlashcardFront] = useState('')
    const [newFlashcardBack, setNewFlashcardBack] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit () {

        const flashcard = {
            frontText: newFlashcardFront,
            backText: newFlashcardBack 
        }

        const response = await fetch('http://localhost:4000/' + props.deckId, {
            method: 'POST',
            body: JSON.stringify(flashcard),
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        const json = await response.json()

        if(response.ok){
            console.log('1 document added')
            setError(null)
        }
        if(!response.ok){
            setError(json.error)
        }
    }

    return(
        <form id = 'add-flashcard-form' onSubmit = {handleSubmit}>
            <input 
            type = 'text'
            placeholder='Flashcard Front Text'
            onChange = {(e) => setNewFlashcardFront(e.target.value)}
            value = {newFlashcardFront}/>
            <input 
            type = 'text'
            placeholder='Flashcard Back Text'
            onChange = {(e) => setNewFlashcardBack(e.target.value)}
            value = {newFlashcardBack}/>
            {error && <p>{error}</p>}
            <button>Submit</button>
        </form>
    )
}