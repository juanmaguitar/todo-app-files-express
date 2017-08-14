function handleLogout (req, res) {
  const { ServiceTasks } = req.app.locals
  req.session = null
  ServiceTasks.clearTasks()
  console.log('❗ LOGOUT!!')
  res.redirect('/login')
}

module.exports = handleLogout
