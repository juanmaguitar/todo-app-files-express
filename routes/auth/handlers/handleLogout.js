function handleLogout (req, res) {
  const { ServiceTasks } = req.app.locals
  clearInterval(process.IdPersistanceTasks)
  req.session = null
  ServiceTasks.clearTasks()
  console.log('❗ LOGOUT!!')
  res.redirect('/login')
}

module.exports = handleLogout
