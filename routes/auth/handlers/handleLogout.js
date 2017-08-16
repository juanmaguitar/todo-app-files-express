function handleLogout (req, res) {
  req.session = req.app.locals.ServiceTasks = null
  console.log('❗ LOGOUT!!')
  res.redirect('/login')
}

module.exports = handleLogout
