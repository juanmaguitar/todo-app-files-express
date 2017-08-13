const handleRoot = require('./handlers/handleRoot')
const handleLogout = require('./handlers/handleLogout')
const showLogin = require('./handlers/showLogin')
const handlePostLogin = require('./handlers/handlePostLogin')

function addAuthRoutes (app) {
  app.get('/', handleRoot)
  app.get('/logout', handleLogout)
  app.get('/login', showLogin)
  app.post('/login', handlePostLogin )
}

module.exports = addAuthRoutes
