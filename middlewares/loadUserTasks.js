function loadUserTasks (req, res, next) {
  const { userLogged, dataLoaded } = req.session
  const { ServiceTasks } = req.app.locals
  if (userLogged && !dataLoaded) {
    ServiceTasks.loadTasks(userLogged)
    req.session.dataLoaded = true
  }
  next()
}

module.exports = loadUserTasks
