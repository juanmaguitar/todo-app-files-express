function updateTask (req, res) {
  const { ServiceTasks } = req.app.locals
  const id = req.params.id
  const done = (req.body.done === 'true')
  const title = req.body.title
  ServiceTasks.updateTask(id, { done, title })
  res.send(`element w/ id ${id} has been updated`)
}

module.exports = updateTask
