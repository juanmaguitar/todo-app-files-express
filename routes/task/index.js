const express = require('express')
const router = express.Router()

const removeTask = require('./handlers/removeTask')
const updateTask = require('./handlers/updateTask')

router.delete('/task/:id', removeTask)
router.put('/task/:id', updateTask)

module.exports = router
