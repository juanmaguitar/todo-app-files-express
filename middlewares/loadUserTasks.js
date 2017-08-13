const path = require('path')
const fs = require('fs')

function loadUserTasks (req, res, next) {
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
}

module.exports = loadUserTasks
