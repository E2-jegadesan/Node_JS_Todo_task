const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'

const databaseName ="todo-task-application"

MongoClient.connect(connectionURL,{ useNewUrlParser : true},(error, client)=>{
    if(error){
        return console.log('unable to connect database')
    }
    const db =client.db(databaseName)
    db.collection('task').insertOne({
        description:"tournament",
        completed:true
    })
})