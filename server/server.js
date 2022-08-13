require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(require('./routes/decks'))
app.use(require('./routes/flashcards'))

const dbo = require("./db/conn")

app.listen(port, () => {
  dbo.connectToServer((err) => {
    if(err) throw err
    console.log('Connected to server on port: ' + port)
  })
})