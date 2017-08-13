const removeTask = require('./handlers/removeTask')
const updateTask = require('./handlers/updateTask')

function addTaskRoutes (app) {
  app.delete('/task/:id', removeTask)
  app.put('/task/:id', updateTask)
}

module.exports = addTaskRoutes
