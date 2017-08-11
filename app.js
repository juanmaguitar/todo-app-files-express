const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const moment = require('moment')

const routesAuth = require('./routes/auth/')
const routesTasks = require('./routes/tasks/')
const routesTask = require('./routes/task/')

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

app.use( (req, res, next) => {
  process.tasks = process.tasks || []
  next()
})

app.use((req, res, next) => {
  let { userLogged, dataLoaded } = req.session

  if (userLogged && !dataLoaded) {
    const pathTasks = path.join(process.cwd(), `data/tasks/${userLogged}.json`)
    if (fs.existsSync(pathTasks)) {
      process.tasks = require(pathTasks)
      req.session.dataLoaded = true
      console.log('data loaded from file...')
    }
    else {
      console.log(`not found ${pathTasks}`)
    }
  }
  next()
})

app.use(routesAuth)
app.use(routesTasks)
app.use(routesTask)

app.listen(PORT)
console.log(`Listening on PORT ${PORT}`)
