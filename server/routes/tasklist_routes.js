const express = require('express')
const router = express.Router()

const TaskList = require('../models/tasklist_model')

const mongoose = require('mongoose')
const db = mongoose.connection

router.get('/all', (req, res) => {
  TaskList.find({}, (err, tasklists) => {
    err ? console.log(err) : res.send({
      tasklists
    })
  })
})

router.post('/new', (req, res) => {
  const __tasklist = req.body
  const newTaskList = TaskList({
    name: __tasklist.name,
    users: __tasklist.users,
    tasks: __tasklist.tasks
  })

  newTaskList.save(err => {
    if (err) console.log(err)
    else {
      res.send({
        message: 'Task List Added Successfully'
      })
    }
  })
})

router.get('/:id', (req, res) => {
  TaskList.find({"_id": req.params.id}, (err, tasklist) => {
    err ? res.send({
      message: 'No tasklist with that ID found!'
    }) : res.send({
      tasklist
    })
  })
})

module.exports = router
