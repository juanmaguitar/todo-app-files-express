function showLogin ({userLogged}, res) {
  if (userLogged) res.redirect('/tasks')
  else res.render('login')
}

module.exports = showLogin
