function handleLogout (req,res) {
  req.session = process.tasks = null
  clearInterval(process.IdPersistanceTasks)
  console.log('❗ LOGOUT!!')
  res.redirect('/login')
}

module.exports = handleLogout
