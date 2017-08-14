const uniqid = require('uniqid')

function addTasks (req, res) {
  const { ServiceTasks } = req.app.locals
  const title = req.body.task
  const newTask = {
    id: uniqid(),
    title,
    done: false,
    createdAt: +(new Date())
  }
  ServiceTasks.addTask(newTask)
  res.redirect('/tasks')
}

module.exports = addTasks
