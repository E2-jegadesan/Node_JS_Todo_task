const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    datas: {
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: 'boolean',
        default: false
    }
})

const Task = mongoose.model('Todo-list',TaskSchema)

module.exports = Task