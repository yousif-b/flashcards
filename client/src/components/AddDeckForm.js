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
        <div className = 'head'>
            <form onSubmit = {handleSubmit}>
                <h1>Flashcards</h1>
                {error && <p>{error}</p>}
                <div className='head-input'>
                    <input
                    className = 'big-input' 
                    type = 'text'
                    placeholder='New Deck Title'
                    onChange = {(e) => setTitle(e.target.value)}
                    value = {title}
                    maxLength = '25'
                    />
                    <button className='btn btn-light'>Add</button>
                </div>
            </form>
        </div>
    )
}