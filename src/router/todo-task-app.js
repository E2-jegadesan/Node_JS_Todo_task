const express = require('express')
const router = new express.Router()
const todoController = require('../controller/todo-task-app')



router.post('/addTask', todoController.addTask);
router.get('/fetchTask', todoController.fetchTask);
router.patch('/tasks/taskUpdated', todoController.taskUpdated);
router.delete('/tasks/deleteTask', todoController.deleteTask);


module.exports = router





