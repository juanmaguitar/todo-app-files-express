const fs = require('fs')
const path = require('path')
const clearRequire = require('clear-require')

function loadUserTasks (req, res, next) {
  const { userLogged, dataLoaded } = req.session
  const { ServiceTasks } = req.app.locals
  if (userLogged && !dataLoaded) {
    const pathTasks = path.join(process.cwd(), `data/tasks/${userLogged}.json`)
    if (fs.existsSync(pathTasks)) {
      clearRequire(pathTasks)
      const userFileTasks = require(pathTasks)
      ServiceTasks.loadTasks(userFileTasks)
      req.session.dataLoaded = true
      console.log(`Loaded ${userFileTasks.length} tasks from file ${pathTasks}...`)
    } else {
      ServiceTasks.loadTasks([])
      console.log(`not found ${pathTasks}`)
    }
  }
  next()
}

module.exports = loadUserTasks
