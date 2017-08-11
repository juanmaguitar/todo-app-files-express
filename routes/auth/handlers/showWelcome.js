function showWelcome (req, res) {
  if (!req.session.userLogged) res.redirect('/login')
  else {
    res.render('welcome', {
      userLogged: req.session.userLogged
    })
  }

}

module.exports = showWelcome
