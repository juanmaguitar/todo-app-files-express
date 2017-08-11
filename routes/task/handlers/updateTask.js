function updateTask (req, res) {
  const id = +req.params.id
  const done = req.body.done === 'true' ? true : false
  const title = req.body.title
  req.session.tasks = req.session.tasks.map( task => {
    if (task.id === id) {
      task.done = done
      task.title = title ? title : task.title
    }
    return task
  })
  res.send(`element w/ id ${id} has been updated`)
}

module.exports = updateTask