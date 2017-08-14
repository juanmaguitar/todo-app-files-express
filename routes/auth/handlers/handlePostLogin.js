const path = require('path')
const fs = require('fs')
const moment = require('moment')
const readFile = require('fs-readfile-promise')

function handlePostLogin (req, res) {
  const { ServiceTasks } = req.app.locals
  const { email, password } = req.body
  const pathUsersList = path.join(process.cwd(), 'data/users.txt')

  readFile(pathUsersList, 'utf-8')
    .then(contentData => contentData.split('\r\n'))
    .then(aAuthLines => aAuthLines.some(authLine => authLine === `${email}:${password}`))
    .then(bDoesExist => {
      if (bDoesExist) {
        const pathUserTasks = path.join(process.cwd(), `data/tasks/${email}.json`)
        req.session.userLogged = email
        process.IdPersistanceTasks = setInterval(function () {
          const tasks = ServiceTasks.getTasks()
          fs.writeFileSync(pathUserTasks, JSON.stringify(tasks, null, 2))
          console.log(`💾 ${moment().format('hh:mm:ss')} writing ${tasks.length} tasks to ${pathUserTasks}`)
        }, 1000)

        res.redirect('/tasks')
      } else {
        res.send('💀 Unauthorized!!')
      }
    })
}

module.exports = handlePostLogin
