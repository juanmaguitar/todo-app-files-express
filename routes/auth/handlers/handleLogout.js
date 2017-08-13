const path = require('path')
const { clearTasks } = require(path.join(process.cwd(), 'models/Task'))

function handleLogout (req, res) {
  req.session = null
  clearTasks()
  clearInterval(process.IdPersistanceTasks)
  console.log('❗ LOGOUT!!')
  res.redirect('/login')
}

module.exports = handleLogout
