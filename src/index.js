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
    next();
  });


app.listen(port,()=>{
    console.log('listening server up on port',port)
})





// fetch('http://localhost:3000/task', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             datas: textInput.value
//         }),
//     })
//         .then((response) => response.json())
//         //Then with the data from the response in JSON...
//         .then((data) => {
//             console.log('Success:', data);
//         })
//         //Then with the error genereted...
//         .catch((error) => {
//             console.error('Error:', error);
//         });


        // fetch('http://localhost:3000/tasks/'+thisId, {
        //         method: 'DELETE',
        //         headers: {
        //             'Content-Type': 'application/json',
        //     }
                
        //     })
        //         .then((response) => response.json())
        //         .then((data) => {
        //             console.log(data)
        //         })
        //         .catch((error) => {
        //             console.log('Error:', error)
        //         })



              //   fetch('http://localhost:3000/tasks', {
              //     method: 'GET',
              //     headers: {
              //         'Content-Type': 'application/json',
              //     }
              // })
              //     .then((response) => response.json())
              //     .then((data) => {
              //         console.log(data)
                      
              //     })
              //     .catch((error) => {
              //         console.log('Error:', error)
              //     })



            //   fetch('http://localhost:3000/tasks/' + thisId, {
            //     method: 'PATCH',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         datas: Data[i].datas
            //     }),
            // })
            //     .then((response) => response.json())
            //     //Then with the data from the response in JSON...
            //     .then((data) => {
            //         console.log('Success:', data);

            //     })

            //     //Then with the error genereted...
            //     .catch((error) => {
            //         console.error('Error:', error);
            //     });

            // fetch('http://localhost:3000/tasks/' + thisId, {
            //     method: 'PATCH',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         datas: EditedInput
            //     }),
            // })
            //     .then((response) => response.json())
            //     //Then with the data from the response in JSON...
            //     .then((data) => {
            //         console.log('Success:', data);

            //     })

            //     //Then with the error genereted...
            //     .catch((error) => {
            //         console.error('Error:', error);
            //     });
