function showTasks (req, res) {
  const { ServiceTasks } = req.app.locals
  const { userLogged } = req.session
  const tasks = ServiceTasks.getTasks()
  res.render('tasks', { tasks, userLogged })
}

module.exports = showTasks
