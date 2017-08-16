const fs = require('fs')
const path = require('path')
const moment = require('moment')
const uniqid = require('uniqid')
const clearRequire = require('clear-require')
const EventEmitter = require('events')

class StoreTasks extends EventEmitter {
  constructor (userLogged) {
    super()
    this.store = { tasks: null }
    this.userLogged = userLogged
    this.pathFile = _pathUserTasks(this.userLogged)

    this.persistTasks = this.persistTasks.bind(this)
    this.on('change', this.persistTasks)
  }

  set tasks (tasks) {
    this.store.tasks = tasks
    this.emit('change')
  }

  get tasks () {
    if (!this.store.tasks) {
      this.store.tasks = this.loadTasks()
    }
    return this.store.tasks
  }

  persistTasks () {
    if (this.store.tasks) {
      fs.writeFileSync(this.pathFile, JSON.stringify(this.store.tasks, null, 2))
      _log('SAVE', this.pathFile, this.store.tasks)
    }
  }

  loadTasks () {
    if (fs.existsSync(this.pathFile)) {
      _log('LOAD', this.pathFile)
      clearRequire(this.pathFile)
      return require(this.pathFile)
    } else {
      _log('NOT FOUND', this.pathFile)
      return []
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
    this.tasks = this.store.tasks.concat([newTask])
  }

  updateTask (id, {done, title}) {
    this.tasks = this.store.tasks.map(task => {
      if (task.id === id) {
        task.done = done || false
        task.title = title || task.title
      }
      return task
    })
  }

  removeTask (id) {
    this.tasks = this.store.tasks.filter(task => task.id !== id)
  }

}

/* HELPERS */

function _pathUserTasks (user) {
  return path.join(process.cwd(), `data/tasks/${user}.json`)
}

function _log (action, path, tasks) {
  const time = moment().format('hh:mm:ss')
  let message

  switch (action) {
    case 'SAVE':
      const numTasks = tasks.length
      message = `💾 ${time} | Change detected! Writing ${numTasks} tasks to ${path}...`
      break
    case 'LOAD':
      message = `😄 Loaded data from file ${path}`
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
