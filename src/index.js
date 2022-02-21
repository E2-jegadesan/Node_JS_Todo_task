const express = require('express');
require('./db/mongoose')
const path = require('path');
const app = express();
const Task = require('./models/todo-task')

const port =process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname,'../templates')
const taskRouter = require('./router/todo-task-app')
app.use(express.json())
app.use(express.static(publicDirectoryPath))
app.use(taskRouter)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE")
    next();
  });


app.listen(port,()=>{
    console.log('listening server up on port',port)
})