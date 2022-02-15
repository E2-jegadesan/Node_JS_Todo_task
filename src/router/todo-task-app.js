const express = require('express')
const Task = require('../models/todo-task')
const router = new express.Router()

//Task Module
router.post('/addTask', async (req, res) => {
        const task = await new Task(req.body)
    try {
        await task.save()
        res.status(201).send({task,message:'Task Added successfully',status:'Success'})
    } catch (e) {
        res.status(400).send({message:'path task is required',status:'Failure'})
    }
})
router.get('/fetchTask', async(req, res)=>{
    try{
        const task = await Task.find()
        res.status(200).send(task)
    }catch(e){
        res.status(500).send(e)  
    }
    
})

router.patch('/tasks/taskUpdated', async (req, res) => {
    const updates = Object.keys(req.body)
    const id = updates.indexOf("_id")
    updates.splice(id,1)
    const allowedUpdates = ['datas', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({ message: 'Invalid Updates..!',status:'Failure' })
    }

    try {
        const task = await Task.findByIdAndUpdate(req.body._id)

        if (!task) {
            res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.status(200).send({task,message:'Task Updated Successfully',status:'Success'})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/deleteTask', async(req,res)=>{

    try{
        const task = await Task.findByIdAndDelete({_id:req.body._id})
        if(!task){
            res.status(404).send()
        }
        res.status(200).send({task,message: 'Task Deleted..!',status:'Success'})
    }catch(e){
        res.status(500).send({message:'Id is required',status:'Failure'})
    }
})

module.exports = router





