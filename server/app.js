const express = require('express')
const port = 3000
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./../webpack.config.dev')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(express.static(path.join(__dirname, 'public/')))

const compiler = webpack(webpackConfig)

app.use(webpackMiddleware(compiler))
app.use(webpackHotMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}))

mongoose.connect('mongodb://localhost/data/db/')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log("Connected to db at /data/db/, or maybe mlab who knows")
})

const user_routes = require('./routes/user_routes.js')
app.use('/user', user_routes)

const tasklist_routes = require('./routes/tasklist_routes')
app.use('/tasklist', tasklist_routes)

const task_routes = require('./routes/task_routes.js')
app.use('/task', task_routes)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.on('close', function() {
    console.error('dropping db')
    db.db.dropDatabase(function() {
        console.error('closing db connection')
        mongoose.connection.close()
    })
})

app.listen(port, function(){
  console.log('Listening on Port: ' + port)
  console.log('Stop Server with CTRL + C')
})
