const { MongoClient } = require('mongodb')
const dbURI = process.env.MONGO_URI
const client = new MongoClient(dbURI)

var _db;

module.exports = {
    connectToServer: (callback) => {
        client.connect((err, db) => {
            if(db){
                _db = db.db('flashcardApp')
                console.log('Connected to MongoDB')
            }
            return callback(err)
        })
    },

    getDb: function() {
        return _db;
    },
}