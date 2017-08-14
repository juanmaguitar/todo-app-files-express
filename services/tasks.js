const fs = require('fs')
const path = require('path')
const clearRequire = require('clear-require')

let _tasks = "[]"

function getTasks () {
  return JSON.parse(_tasks)
}

function loadTasks (userLogged) {
  const pathTasks = path.join(process.cwd(), `data/tasks/${userLogged}.json`)
  if (fs.existsSync(pathTasks)) {
    clearRequire(pathTasks)
    const userFileTasks = require(pathTasks)
    _tasks = JSON.stringify(userFileTasks)
    console.log(`Loaded ${userFileTasks.length} tasks from file ${pathTasks}...`)
  } else {
    _tasks = JSON.stringify([])
    console.log(`not found ${pathTasks}`)
  }
}

function clearTasks () {
  _tasks = null
}

function addTask (task) {
  const tasks = JSON.parse(_tasks)
  tasks.push(task)
  _tasks = JSON.stringify(tasks)
}

function updateTask (id, {done, title}) {
  let tasks = JSON.parse(_tasks)
  let updatedTasks = tasks.map(task => {
    if (task.id === id) {
      task.done = done || false
      task.title = title || task.title
    }
    return task
  })
  _tasks = JSON.stringify(updatedTasks)
}

function removeTask (id) {
  let tasks = JSON.parse(_tasks)
  tasks = tasks.filter(task => task.id !== id)
  _tasks = JSON.stringify(tasks)
}

module.exports = {
  getTasks,
  loadTasks,
  addTask,
  updateTask,
  removeTask,
  clearTasks
}
