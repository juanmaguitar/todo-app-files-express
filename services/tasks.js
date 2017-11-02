const fs = require('fs')
const path = require('path')
const moment = require('moment')
const uniqid = require('uniqid')
const clearRequire = require('clear-require')
const EventEmitter = require('events')

class StoreTasks extends EventEmitter {
  constructor (userLogged) {
    super()
    this._store = { tasks: null }
    this._pathFile = _pathUserTasks(userLogged)

    this._persistTasks = this._persistTasks.bind(this)
    this.on('change', this._persistTasks)
  }

  set tasks (tasks) {
    this._store.tasks = tasks
    this.emit('change')
  }

  get tasks () {
    if (!this._store.tasks) {
      this._store.tasks = this._loadTasks()
    }
    return this._store.tasks
  }

  _persistTasks () {
    if (this._store.tasks) {
      fs.writeFileSync(this._pathFile, JSON.stringify(this._store.tasks, null, 2))
      _log('SAVE', this._pathFile, this._store.tasks)
    }
  }

  _loadTasks () {
    if (fs.existsSync(this._pathFile)) {
      _log('LOAD', this._pathFile)
      clearRequire(this._pathFile)
      return require(this._pathFile)
    } else {
      _log('NOT FOUND', this._pathFile)
      return []
    }
  }

  addTask (title) {
    const newTask = {
      id: uniqid(),
      title,
      done: false,
      createdAt: +(new Date())
    }
    this.tasks = this._store.tasks.concat([newTask])
  }

  updateTask (id, {done=false, title}) {
    this.tasks = this._store.tasks.map(task => {
      let mTask
      if (task.id === id) {
        title = title || task.title
        mTask = Object.assign( task, { done, title } )
      }
      console.log(mTask || task)
      return mTask || task
    })
  }

  removeTask (id) {
    this.tasks = this._store.tasks.filter(task => task.id !== id)
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
