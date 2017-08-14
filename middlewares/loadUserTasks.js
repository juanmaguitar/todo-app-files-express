const path = require('path')
const fs = require('fs')
const clearRequire = require('clear-require')
const { loadTasks } = require(path.join(process.cwd(), 'models/tasks'))

function loadUserTasks (app, req, res, next) {
  let { userLogged, dataLoaded } = req.session
  console.log({ userLogged, dataLoaded })
  if (userLogged && !dataLoaded) {
    const pathTasks = path.join(process.cwd(), `data/tasks/${userLogged}.json`)
    if (fs.existsSync(pathTasks)) {
      clearRequire(pathTasks)
      const userFileTasks = require(pathTasks)
      console.log(userFileTasks)
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
