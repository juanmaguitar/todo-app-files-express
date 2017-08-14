const uniqid = require('uniqid')
const path = require('path')
const { addTask } = require(path.join(process.cwd(), 'models/tasks'))

function addTasks (req, res) {
  const title = req.body.task
  const newTask = {
    id: uniqid(),
    title,
    done: false,
    createdAt: +(new Date())
  }
  addTask(newTask)
  res.redirect('/tasks')
}

module.exports = addTasks
