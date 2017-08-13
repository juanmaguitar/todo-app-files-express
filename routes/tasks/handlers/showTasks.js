function showTasks (req, res) {
  let { userLogged } = req.session
  let { tasks } = process

  res.render('tasks', { tasks, userLogged })
}

module.exports = showTasks
