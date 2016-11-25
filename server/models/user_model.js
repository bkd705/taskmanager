const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  }
})

const User = mongoose.model('user', user)

module.exports = User
