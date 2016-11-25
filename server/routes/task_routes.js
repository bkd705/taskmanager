const express = require('express')
const router = express.Router()

const Task = require('../models/task_model')

const mongoose = require('mongoose')
const db = mongoose.connection

router.get('/all', (req, res) => {
  Task.find({}, (err, tasks) => {
    err ? console.log(err) : res.send({
      tasks
    })
  })
})

router.post('/new', (req, res) => {
  const __task = req.body
  const newTask = Task({
    title: __task.title,
    users: __task.users,
    completed: false
  })

  newTask.save(err => {
    if (err) console.log(err)
    else {
      res.send({
        message: 'Task Added Successfully'
      })
    }
  })
})

router.delete('/delete/:id', (req, res) => {
  Task.remove({"_id": req.params.id}, err => {
    err ? res.send({
      success: false,
      message: err
    }) : res.send({
      success: true,
      message: 'Task deleted successfully!'
    })
  })
})

router.put('/update', (req, res) => {
  const __task = req.body
  Task.update({"_id": __task.id}, __task, err => {
    if (err) res.status(500).send(err)
    else {
      res.send({
        type: success,
        message: 'Task updated successfully!'
      })
    }
  })
})

module.exports = router
