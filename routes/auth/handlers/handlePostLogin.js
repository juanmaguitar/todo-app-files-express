const path = require('path')
const readFile = require('fs-readfile-promise')

function handlePostLogin (req, res) {
  const { email, password } = req.body
  const pathUsersList = path.join(process.cwd(), 'data/users.txt')

  readFile(pathUsersList, 'utf-8')
    .then(contentData => contentData.split('\n'))
    .then(aAuthLines => aAuthLines.some(authLine =>
      authLine === `${email}:${password}`
    ))
    .then(bDoesExist => {
      if (bDoesExist) {
        req.session.userLogged = email
        res.redirect('/tasks')
      } else {
        res.send('💀 Unauthorized!!')
      }
    })
}

module.exports = handlePostLogin
