function updateTask (req, res) {
  const id = +req.params.id
  const done = (req.body.done === 'true')
  const title = req.body.title
  process.tasks = process.tasks.map(task => {
    if (task.id === id) {
      task.done = done
      task.title = title || task.title
    }
    return task
  })
  res.send(`element w/ id ${id} has been updated`)
}

module.exports = updateTask
