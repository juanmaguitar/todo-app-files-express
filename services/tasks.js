const fs = require('fs')
const path = require('path')
const moment = require('moment')
const uniqid = require('uniqid')
const clearRequire = require('clear-require')
const EventEmitter = require('events')

class StoreTasks extends EventEmitter {
  constructor () {
    super()
    this.store = { tasks: [] }
    this.userLogged = null

    this.persistTasks = this.persistTasks.bind(this)
    this.on('change', this.persistTasks)
  }

  getTasks (userLogged) {
    if (!this.userLogged) this.loadTasks(userLogged)
    return this.store.tasks
  }

  persistTasks () {
    const path = _pathUserTasks(this.userLogged)
    fs.writeFileSync(path, JSON.stringify(this.store.tasks, null, 2))
    _log('SAVE', path, this.store.tasks)
  }

  loadTasks (userLogged) {
    this.userLogged = userLogged
    const path = _pathUserTasks(this.userLogged)
    if (fs.existsSync(path)) {
      clearRequire(path)
      this.store.tasks = require(path)
      _log('LOAD', path, this.store.tasks)
    } else {
      this.store.tasks = []
      _log('NOT FOUND', path)
    }
  }

  clearTasks () {
    this.userLogged = this.store.tasks = null
  }

  addTask (title) {
    const newTask = {
      id: uniqid(),
      title,
      done: false,
      createdAt: +(new Date())
    }
    this.store.tasks.push(newTask)
    this.emit('change')
  }

  updateTask (id, {done, title}) {
    this.store.tasks = this.store.tasks.map(task => {
      if (task.id === id) {
        task.done = done || false
        task.title = title || task.title
      }
      return task
    })
    this.emit('change')
  }

  removeTask (id) {
    this.store.tasks = this.store.tasks.filter(task => task.id !== id)
    this.emit('change')
  }

}

/* HELPERS */

function _pathUserTasks (user) {
  return path.join(process.cwd(), `data/tasks/${user}.json`)
}

function _log (action, path, tasks) {
  const time = moment().format('hh:mm:ss')
  const numTasks = tasks.length
  let message

  switch (action) {
    case 'SAVE':
      message = `💾 ${time} | Change detected! Writing ${numTasks} tasks to ${path}...`
      break
    case 'LOAD':
      message = `😄 Loaded ${numTasks} tasks from file ${path}`
      break
    case 'NOT FOUND':
      message = `❗ Not found ${path}`
      break
    default:
      message = `⁉️ Action unknown`
      break
  }
  console.log(message)
}

module.exports = StoreTasks
