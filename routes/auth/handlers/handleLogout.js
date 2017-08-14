const path = require('path')
const { clearTasks } = require(path.join(process.cwd(), 'models/tasks'))

function handleLogout (req, res) {
  clearInterval(process.IdPersistanceTasks)
  req.session = null
  clearTasks()
  console.log('❗ LOGOUT!!')
  res.redirect('/login')
}

module.exports = handleLogout
