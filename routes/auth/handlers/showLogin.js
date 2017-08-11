function showLogin (req, res) {
  if (req.session.userLogged){
    const {userLogged} = req.session
    res.redirect('/tasks')
  }
  else res.render('login')
}

module.exports = showLogin
