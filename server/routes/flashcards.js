const express = require('express')

const router = express.Router()

const dbo = require("../db/conn")

const ObjectId = require('mongodb').ObjectId

router.post('/:deckId', (req, response) => {
    let db_connect = dbo.getDb('flashcardApp')
    let flashcard = {
        _id: new ObjectId(),
        frontText: req.body.frontText,
        backText: req.body.backText
    }
    console.log(flashcard)
    let myquery = {_id: ObjectId(req.params.deckId)}
    db_connect.collection('flashcards').update(myquery, {$push: {flashcards: flashcard}}, (err, res) =>{
        if(err) throw err
        response.json(res)
    }) 
})

router.patch('/:deckId/:flashcardId', (req, response) => {
    let db_connect = dbo.getDb('flashcardApp')
    let myquery = {'flashcards._id': ObjectId(req.params.flashcardId)}
    db_connect.collection('flashcards').updateOne(myquery, {$set: {'flashcards.$.frontText': req.body.frontText, 'flashcards.$.backText': req.body.backText}}, (err, res) =>{
        if(err) throw err
        response.json(res)
    })
})

router.delete('/:deckId/:flashcardId', (req, response) => {
    let db_connect = dbo.getDb('flashcardApp')
    let deckQuery = {_id: ObjectId(req.params.deckId)}
    let flashcardQuery = {_id: ObjectId(req.params.flashcardId)}
    db_connect.collection('flashcards').updateOne(deckQuery, {$pull: { flashcards: flashcardQuery}}, (err, obj) => {
        if(err) throw err
        response.json(obj)
    })
})

module.exports = router