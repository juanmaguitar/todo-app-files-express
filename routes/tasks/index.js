const showTasks = require('./handlers/showTasks')
const addTasks = require('./handlers/addTasks')

function addTasksRoutes (app) {
  app.get('/tasks', showTasks)
  app.post('/tasks', addTasks)
}

module.exports = addTasksRoutes
