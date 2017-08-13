const uniqid = require('uniqid')

function addTasks (req, res) {
  const title = req.body.task
  const newTask = {
    id: uniqid(),
    title,
    done: false,
    createdAt: +(new Date())
  }
  process.tasks = process.tasks.concat([newTask])
  res.redirect('/tasks')
}

module.exports = addTasks
