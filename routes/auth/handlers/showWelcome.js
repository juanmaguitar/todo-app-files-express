function showWelcome ({ userLogged }, res) {
  if (!userLogged) res.redirect('/login')
  else res.render('welcome', { userLogged })
}

module.exports = showWelcome
