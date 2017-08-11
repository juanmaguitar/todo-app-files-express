function removeTask(req, res) {
  const id = +req.params.id
  process.tasks = process.tasks.filter( task => task.id !== id )
  res.send(`element w/ id ${id} has been removed`)
}

module.exports = removeTask
