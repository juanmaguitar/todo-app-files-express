const path = require('path')
const { removeTask: _removeTask } = require(path.join(process.cwd(), 'models/tasks'))

function removeTask (req, res) {
  const id = req.params.id
  _removeTask(id)
  res.status(200).send(`element w/ id ${id} has been removed`)
}

module.exports = removeTask
