const Task = require('../models/todo-task')
const msg = require('../../src/config/dbconfig')

module.exports = {
    addTask: addTask,
    fetchTask: fetchTask,
    taskUpdated: taskUpdated,
    deleteTask: deleteTask
}

async function addTask(req, res) {
    const task = await new Task(req.body)
    try {
        await task.save()
        res.status(201).send(msg.Successmsg('Task Added successfully'))
    } catch (e) {
        res.status(400).send(msg.Failuremsg(e._message))
    }
}

async function fetchTask(req, res) {
    try {
        const task = await Task.find()
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(msg.Failuremsg('error while fetch'))
    }
}

async function taskUpdated(req, res) {
    const updates = Object.keys(req.body)
    try {
        const task = await Task.findByIdAndUpdate(req.body._id)

        if (!task) {
            res.status(404).send(msg.Failuremsg('Unable to find datas'))
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.status(200).send(msg.Successmsg('Task Updated Successfully'))
    } catch (e) {
        res.status(400).send(msg.Failuremsg('modification error'))
    }
}

async function deleteTask(req, res) {

    try {
        const task = await Task.findByIdAndDelete({ _id: req.body._id })
        if (!task) {
            res.status(404).send(msg.Failuremsg(e))
        }
        res.status(200).send(msg.Successmsg('Task Deleted Successfully'))
    } catch (e) {
        res.status(500).send(msg.Failuremsg(e.message))
    }
}