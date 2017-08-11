const express = require('express')
const router = express.Router()

const removeTask = require('./handlers/removeTask')
const updateTask = require('./handlers/updateTask')

let tasks = global.tasks

router.delete('/task/:id', removeTask)
router.put('/task/:id', updateTask)

module.exports = router