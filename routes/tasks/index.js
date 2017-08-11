const express = require('express')
const router = express.Router()

const showTasks = require('./handlers/showTasks')
const addTasks = require('./handlers/addTasks')

router.get('/tasks', showTasks)
router.post('/tasks', addTasks)

module.exports = router
