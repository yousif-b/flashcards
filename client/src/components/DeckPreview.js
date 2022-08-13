import { useState } from "react";
import { Link } from "react-router-dom";

export default function DeckPreview(props){
    const [deleteError, setDeleteError] = useState(null)
    const [editError, setEditError] = useState(null)
    const [title, setTitle] = useState(props.deck.title)
    const [edit, setEdit] = useState(false)
    
    async function handleEdit(){
        const deck = {
            title: title
        }
        const response = await fetch('http://localhost:4000/'+ props.deck._id, {
            method: 'PATCH',
            body: JSON.stringify(deck),
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        const json = await response.json()
        if(response.ok){
            setEditError(null)
        }
        if(!response.ok){ setEditError(json.error) }
        window.location.reload()
    }

    async function handleDelete(){
        const response = await fetch('http://localhost:4000/' + props.deck._id, {
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
        <div className="deck-preview">
            {edit ? (<input type = 'text'
            value = {title} onChange = {(e) => {setTitle(e.target.value)}}
            className = 'big-input'
            />):
            (<Link to = {'/deck/' + props.deck._id}><h2>{title}</h2></Link>)}
            <p>{props.deck.flashcards.length} terms</p>
            {edit ?(<div className = 'button-container'>
                {editError && <p>{editError}</p>}
                <button className = 'btn btn-light' onClick={handleEdit}>Save</button>
                <button className = 'btn btn-light' onClick = {() => {window.location.reload()}}>Discard</button>
            </div>):(<div className = 'button-container'>
                {deleteError && <p>{deleteError}</p>}
                <button className = 'btn btn-light' onClick = {() => {setEdit(true)}}>Edit</button>
                <button className = 'btn btn-light' onClick = {handleDelete}>Delete</button>
            </div>)}
        </div>
    )
}