function showLogin (req, res) {
  const {userLogged} = req.session
  if (userLogged) res.redirect('/tasks')
  else res.render('login')
}

module.exports = showLogin
