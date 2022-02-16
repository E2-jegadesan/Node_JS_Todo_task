const express = require('express')
const Task = require('../models/todo-task')
const router = new express.Router()
const msg = require('../../templates/config')

//Task Module
router.post('/addTask', async (req, res) => {
        const task = await new Task(req.body)
    try {
        await task.save()
        res.status(201).send(msg('Task Added successfully','Success'))
    } catch (e) {
        res.status(400).send(msg(e._message,'Failure'))
    }
})
router.get('/fetchTask', async(req, res)=>{
    try{
        const task = await Task.find()
        res.status(200).send(task)
    }catch(e){
        res.status(500).send(msg('error while fethching task','Failure'))  
    }
    
})

router.patch('/tasks/taskUpdated', async (req, res) => {
    const updates = Object.keys(req.body)
    const id = updates.indexOf("_id")
    updates.splice(id,1)
    const allowedUpdates = ['datas', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send(msg('Invalid Updates..!','Failure' ))
    }

    try {
        const task = await Task.findByIdAndUpdate(req.body._id)

        if (!task) {
            res.status(404).send(e)
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.status(200).send(msg('Task Updated Successfully','Success'))
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/deleteTask', async(req,res)=>{

    try{
        const task = await Task.findByIdAndDelete({_id:req.body._id})
        if(!task){
            res.status(404).send(e)
        }
        res.status(200).send(msg('Task Deleted Successfully','Success'))
    }catch(e){
        res.status(500).send(msg(e.message,"Failure"))
    }
})

module.exports = router





