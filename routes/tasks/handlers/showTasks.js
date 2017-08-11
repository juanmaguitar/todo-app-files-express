const path = require('path')
const fs = require('fs')

function showTasks (req, res) {
  let { userLogged } = req.session
  let { tasks } = process
  debugger;
  
  res.render('tasks', { tasks, userLogged })
}

module.exports = showTasks
