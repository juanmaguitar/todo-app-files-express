const path = require('path')
const fs = require('fs')
const { loadTasks } = require(path.join(process.cwd(), 'models/Task'))

function loadUserTasks (app, req, res, next) {
  let { userLogged, dataLoaded } = req.session
  if (userLogged && !dataLoaded) {
    const pathTasks = path.join(process.cwd(), `data/tasks/${userLogged}.json`)
    if (fs.existsSync(pathTasks)) {
      const userFileTasks = require(pathTasks)
      loadTasks(userFileTasks)
      req.session.dataLoaded = true
      console.log(`Loaded ${userFileTasks.length} tasks from file ${pathTasks}...`)
    } else {
      loadTasks([])
      console.log(`not found ${pathTasks}`)
    }
  }
  next()
}

module.exports = loadUserTasks
