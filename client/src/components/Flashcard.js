import React from 'react'
import { useState } from 'react'

export default function Flashcard(props){
  const [text, setText] = useState(props.flashcard.frontText)
  const [flip, setFlip] = useState(false)
  function flipCard(){
    switch(flip){
        case false:
            setText(props.flashcard.backText)
            setFlip(true)
            break;
        case true:
            setText(props.flashcard.frontText)
            setFlip(false)
            break;
    }
  }

  return (
    <div className = 'flashcard' onClick={flipCard}>
        <h1>{text}</h1>
    </div>
  )
}
