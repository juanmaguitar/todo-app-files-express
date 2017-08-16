function showTasks (req, res) {
  const { tasks } = req.app.locals.ServiceTasks
  const { userLogged } = req.session
  res.render('tasks', { tasks, userLogged })
}

module.exports = showTasks
