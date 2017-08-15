function addTasks (req, res) {
  const { ServiceTasks } = req.app.locals
  const title = req.body.task
  ServiceTasks.addTask(title)
  res.redirect('/tasks')
}

module.exports = addTasks
