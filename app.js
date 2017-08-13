const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const moment = require('moment')

const middLoadUserTasks = require('./middlewares/loadUserTasks')
const middDebugRoutes = require('./middlewares/debug')

const app = express()
const pathPublic = path.join(__dirname, 'public')
const PORT = 3002

app.use(cookieSession({
  name: 'myCustomCookieSession',
  keys: ['a2f9b59687c11d916422', '01783c0617dac7abc6b4']
}))

app.use(express.static(pathPublic))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'pug')
app.locals.moment = moment

app.use(middLoadUserTasks.bind(null, app))
app.use(middDebugRoutes)

// add routes
require('./routes/auth/')(app)
require('./routes/tasks/')(app)
require('./routes/task/')(app)

app.listen(PORT)
console.log(`Listening on PORT ${PORT}`)
