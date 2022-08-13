const express = require('express')

const router = express.Router()

const dbo = require("../db/conn")

const ObjectId = require('mongodb').ObjectId

router.get('/', (req, res) => {
    let db_connect = dbo.getDb('flashcardApp')
    db_connect.collection('flashcards').find({}).toArray((err, result) => {
        if(err) throw err
        res.json(result)
    })
})

router.get('/:deckId', (req, res) => {
    let db_connect = dbo.getDb('flashcardApp')
    let myquery = {_id: ObjectId(req.params.deckId)}
    db_connect.collection('flashcards').findOne(myquery, (err, result) => {
        if(err) throw err
        res.json(result)
    })
})

router.post('/', (req, response) => {
    let db_connect = dbo.getDb('flashcardApp')
    let myDeck = {
        title: req.body.title,
        flashcards: [],
    }
    db_connect.collection('flashcards').insertOne(myDeck, (err, res) => {
        if(err) throw err
        response.json(res)
    })
})

router.delete('/:deckId', (req, response) => {
    let db_connect = dbo.getDb('flashcardApp')
    let myquery = {_id: ObjectId(req.params.deckId)}
    db_connect.collection('flashcards').deleteOne(myquery, (err, obj) => {
        if(err) throw err
        response.json(obj)
    })
})

router.patch('/:deckId', (req, response) => {
    let db_connect = dbo.getDb('flashcardApp')
    let myquery = {_id: ObjectId(req.params.deckId)}
    db_connect.collection('flashcards').updateOne(myquery, {$set: req.body}, (err, res) =>{
        if(err) throw err
        response.json(res)
    })
})

module.exports = router