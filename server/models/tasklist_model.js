const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskListSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  users: {
    type: Array
  },
  tasks: {
    type: Array
  }
})

const TaskList = mongoose.model('taskListSchema', taskListSchema)

module.exports = TaskList
