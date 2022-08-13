import {useState} from 'react'
import { Link } from "react-router-dom";

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
        <div className = 'head'>
            <form onSubmit = {handleSubmit}>
                <h1>{props.deckTitle}</h1>
                <div className='head-input'>
                <Link to = '/'><button style = {{height: '100%'}} className='btn'>Back</button></Link>
                <textarea
                className='flashcard-input'
                maxLength = {150}
                placeholder='Flashcard Front Text'
                onChange = {(e) => setNewFlashcardFront(e.target.value)}
                value = {newFlashcardFront}/>
                <textarea 
                className='flashcard-input'
                maxLength = {150}
                placeholder='Flashcard Back Text'
                onChange = {(e) => setNewFlashcardBack(e.target.value)}
                value = {newFlashcardBack}/>
                {error && <p>{error}</p>}
                <button className='btn'>Submit</button>
                </div>
            </form>            
        </div>
    )
}