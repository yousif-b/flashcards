import {useState} from 'react'

export default function AddDeckForm(){
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit () {

        const deck = {
            title 
        }

        const response = await fetch('http://localhost:4000/', {
            method: 'POST',
            body: JSON.stringify(deck),
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        const json = await response.json()

        if(response.ok){
            console.log('1 document added')
            setTitle('')
            setError(null)
        }
        if(!response.ok){
            setError(json.error)
        }
    }
    
    return (
        <div>
            <form id = 'add-deck-form' onSubmit = {handleSubmit}>
                <input 
                type = 'text'
                placeholder='Deck Title'
                onChange = {(e) => setTitle(e.target.value)} // two way data binding
                value = {title} />
                {error && <p>{error}</p>}
                <button>Submit</button>
            </form>
        </div>
    )
}