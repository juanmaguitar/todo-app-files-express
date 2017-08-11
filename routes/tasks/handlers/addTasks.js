let counter = 1

function addTasks(req, res) {
  const title = req.body.task
  const newTask = {
    id: ++counter,
    title,
    done: false,
    createdAt: +(new Date())
  }
  process.tasks.push(newTask)
  res.redirect('/')
}

module.exports = addTasks
