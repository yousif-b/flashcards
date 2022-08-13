import { useState } from "react"

export default function FullFlashcard(props){
    const [frontText, setFrontText] = useState(props.flashcard.frontText)
    const [backText, setBackText] = useState(props.flashcard.backText)
    const [editError, setEditError] = useState(null)
    const [deleteError, setDeleteError] = useState(null)
    const [edit, setEdit] = useState(false)

    async function handleEdit () {
        const flashcard = {
            frontText: frontText,
            backText: backText 
        }
        const response = await fetch('http://localhost:4000/'+ props.deckId + '/' + props.flashcard._id, {
            method: 'PATCH',
            body: JSON.stringify(flashcard),
            headers:{
                'Content-Type' : 'application/json'
            }
        })

        const json = await response.json()

        if(response.ok){
            console.log('1 document updated')
            setEditError(null)
        }
        if(!response.ok){
            setEditError(json.error)
        }
    }

    async function handleDelete(){
        const response = await fetch('http://localhost:4000/' + props.deckId + '/' + props.flashcard._id, {
            method: 'DELETE'
        })

        const json = response.json()

        if(response.ok){
            console.log('1 document deleted')
            setDeleteError(null)
        }
        if(!response.ok){
            setDeleteError(json.error)
        }
        window.location.reload()
    }

    return(
        <div className = 'full-flashcard'>
            {edit ? (
                <div>
                    <form onSubmit={handleEdit}>
                    <h3>Front Text:</h3>
                    <textarea
                    className='flashcard-input'
                    maxLength = {150}
                    value = {frontText}
                    onChange = {(e) => setFrontText(e.target.value)}/>
                    <h3>Back Text:</h3>
                    <textarea
                    className='flashcard-input' 
                    maxLength = {150}                  
                    value={backText}
                    onChange = {(e) => setBackText(e.target.value)}/>
                    <div className="btn-container">
                        <input type = 'submit' value = 'Save' />
                        {editError && <p>{editError}</p>}
                        <button onClick = {() => {
                            setEdit(false)
                        }}>Discard Changes</button>
                    </div>
                    </form>
                </div>) : (
                <div>
                    <h3>Front Text:</h3>
                    <p>{frontText}</p>
                    <h3>Back Text:</h3>
                    <p>{backText}</p>
                    {deleteError && <p>{deleteError}</p>}
                    <div className="btn-container">
                        <button onClick = {() => {
                            setEdit(true)
                        }}>Edit</button>
                        <button onClick = {handleDelete}>Delete</button>
                    </div>   
                </div>
            )}
        </div>
    )
}