function removeTask (req, res) {
  const { ServiceTasks } = req.app.locals
  const id = req.params.id
  ServiceTasks.removeTask(id)
  res.status(200).send(`element w/ id ${id} has been removed`)
}

module.exports = removeTask
