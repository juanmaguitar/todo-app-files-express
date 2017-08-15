const fs = require('fs')
const path = require('path')
const moment = require('moment')
const uniqid = require('uniqid')
const clearRequire = require('clear-require')
const EventEmitter = require('events');

class StoreTasks extends EventEmitter {
  constructor () {
    super()
    this.store = { tasks: [] }
  }

  getTasks () {
    return this.store.tasks
  }

  persistTasks (userLogged) {
    const pathUserTasks = path.join(process.cwd(), `data/tasks/${userLogged}.json`)
    this.idInterval = setInterval(() => {
      fs.writeFileSync(pathUserTasks, JSON.stringify(this.store.tasks, null, 2))
      console.log(`💾 ${moment().format('hh:mm:ss')} writing ${this.store.tasks.length} tasks to ${pathUserTasks}`)
    }, 1000)
  }

  loadTasks (userLogged) {
    const pathTasks = path.join(process.cwd(), `data/tasks/${userLogged}.json`)
    if (fs.existsSync(pathTasks)) {
      clearRequire(pathTasks)
      this.store.tasks = require(pathTasks)
      console.log(`Loaded ${this.store.tasks.length} tasks from file ${pathTasks}...`)
    } else {
      this.store.tasks = []
      console.log(`not found ${pathTasks}`)
    }
  }

  clearTasks () {
    clearInterval(this.idInterval)
    this.store.tasks = null
  }

  addTask (title) {
    const newTask = {
      id: uniqid(),
      title,
      done: false,
      createdAt: +(new Date())
    }
    this.store.tasks.push(newTask)
  }

  updateTask (id, {done, title}) {
    this.store.tasks = this.store.tasks.map(task => {
      if (task.id === id) {
        task.done = done || false
        task.title = title || task.title
      }
      return task
    })
  }

  removeTask (id) {
    this.store.tasks = this.store.tasks.filter(task => task.id !== id)
  }

}

module.exports = StoreTasks
