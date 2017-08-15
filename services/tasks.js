const fs = require('fs')
const path = require('path')
const moment = require('moment')
const uniqid = require('uniqid')
const clearRequire = require('clear-require')

const store = {
  tasks: []
}
let idInterval

function getTasks () {
  return store.tasks
}

function persistTasks (userLogged) {
  const pathUserTasks = path.join(process.cwd(), `data/tasks/${userLogged}.json`)
  idInterval = setInterval(function () {
    fs.writeFileSync(pathUserTasks, JSON.stringify(store.tasks, null, 2))
    console.log(`💾 ${moment().format('hh:mm:ss')} writing ${store.tasks.length} tasks to ${pathUserTasks}`)
  }, 1000)
}

function loadTasks (userLogged) {
  const pathTasks = path.join(process.cwd(), `data/tasks/${userLogged}.json`)
  if (fs.existsSync(pathTasks)) {
    clearRequire(pathTasks)
    store.tasks = require(pathTasks)
    console.log(`Loaded ${store.tasks.length} tasks from file ${pathTasks}...`)
  } else {
    store.tasks = []
    console.log(`not found ${pathTasks}`)
  }
}

function clearTasks () {
  clearInterval(idInterval)
  store.tasks = null
}

function addTask (title) {
  const newTask = {
    id: uniqid(),
    title,
    done: false,
    createdAt: +(new Date())
  }
  store.tasks.push(newTask)
}

function updateTask (id, {done, title}) {
  store.tasks = store.tasks.map(task => {
    if (task.id === id) {
      task.done = done || false
      task.title = title || task.title
    }
    return task
  })
}

function removeTask (id) {
  store.tasks = store.tasks.filter(task => task.id !== id)
}

module.exports = {
  getTasks,
  loadTasks,
  addTask,
  updateTask,
  removeTask,
  persistTasks,
  clearTasks
}
