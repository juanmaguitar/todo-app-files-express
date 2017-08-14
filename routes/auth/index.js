const express = require('express')
const router = express.Router()

const handleRoot = require('./handlers/handleRoot')
const handleLogout = require('./handlers/handleLogout')
const showLogin = require('./handlers/showLogin')
const handlePostLogin = require('./handlers/handlePostLogin')

router.get('/', handleRoot)
router.get('/logout', handleLogout)
router.get('/login', showLogin)
router.post('/login', handlePostLogin)

module.exports = router
