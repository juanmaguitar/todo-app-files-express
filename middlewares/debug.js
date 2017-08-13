function debugRoutes (req, res, next) {
  const msg = `new request to [${req.method}] ${req.path}`
  const lengthMsg = msg.length > 0 ? msg.length : 0
  require('debug')(msg)('-'.repeat(120 - lengthMsg))
  next()
}

module.exports = debugRoutes
