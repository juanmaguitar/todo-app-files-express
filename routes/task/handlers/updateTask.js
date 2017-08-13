const path = require('path')
const { updateTask: _updateTask } = require(path.join(process.cwd(), 'models/Task'))

function updateTask (req, res) {
  const id = req.params.id
  const done = (req.body.done === 'true')
  const title = req.body.title
  _updateTask(id, { done, title })
  res.send(`element w/ id ${id} has been updated`)
}

module.exports = updateTask
