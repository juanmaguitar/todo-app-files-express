const path = require('path')
const fs = require('fs')
const readFile = require('fs-readfile-promise')

function handlePostLogin (req, res) {
  const { email, password } = req.body
  const pathUsersList = path.join(process.cwd(), 'data/users.txt')

  console.log(pathUsersList)

  readFile(pathUsersList, 'utf-8')
    .then(contentData => contentData.split('\r\n'))
    .then(aAuthLines => aAuthLines.some(authLine => {
      return authLine === `${email}:${password}`
    }))
    .then(bDoesExist => {
      if (bDoesExist) {
        const pathUserTasks = path.join(process.cwd(), `data/tasks/${email}.json`)
        req.session.userLogged = email

        global.IdPersistanceTasks = setInterval( () => {
          fs.writeFileSync(pathUserTasks, JSON.stringify(process.tasks))
          console.log(`💾 writing ${ process.tasks.length} tasks to ${pathUserTasks}`)
        }, 2000)
        res.redirect('/tasks')
      } else {
        res.send('💀 Unauthorized!!')
      }
    })

//  res.send('all done!!')
}

module.exports = handlePostLogin
