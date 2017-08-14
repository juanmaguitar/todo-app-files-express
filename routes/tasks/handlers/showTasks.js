const path = require('path')
const { getTasks } = require(path.join(process.cwd(), 'models/tasks'))

function showTasks (req, res) {
  let { userLogged } = req.session
  const tasks = getTasks()
  console.log(tasks)
  res.render('tasks', { tasks, userLogged })
}

module.exports = showTasks
