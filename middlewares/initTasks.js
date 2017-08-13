function initTasks(req, res, next) {
  process.tasks = process.tasks || []
  next()
}

module.exports = initTasks
