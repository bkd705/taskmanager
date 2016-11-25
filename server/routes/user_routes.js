const express = require('express')
const router = express.Router()

const User = require('../models/user_model')

const mongoose = require('mongoose')
const db = mongoose.connection
const objectId = mongoose.Types.ObjectId;

router.get('/all', (req, res) => {
  User.find({}, (err, users) => {
    err ? console.log(err) : res.send({
      users
    })
  })
})

router.post('/new', (req, res) => {
  const __user = req.body
  const newUser = User({
    username: __user.username,
    name: __user.name,
    address: __user.address,
    dob: __user.dob
  })

  newUser.save(err => {
    if (err) {
      console.log(err)
      if(err.name === 'MongoError' && err.code === 11000) {
        return res.status(500).send({
          success: false,
          message: 'User Already Exists!'
        })
      }
    } else {
        res.send({
          message: 'User Added Successfully'
        })
    }
  })
})

router.get('/:username', (req, res) => {
  User.find({"username": req.params.username}, (err, user) => {
    err ? res.send({
      message: 'Cannot find user with that username!'
    }) : res.send({
      user
    })
  })
})

router.put('/update', (req, res) => {
  const __user = req.body
  User.update({"_id": __user._id}, __user, err => {
    if (err) return res.status(500).send(err)
    else {
      res.send({
        message: 'User updated successfully', __user
      })
    }
  })
})

router.delete('/delete/:username', (req, res) => {
  User.remove({"username": req.params.username}, err => {
    err ? res.send({
      success: false,
      message: err
    }) : res.send({
      success: true,
      message: 'Successfully deleted user!'
    })
  })
})

module.exports = router
