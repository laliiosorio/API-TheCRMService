
module.exports = app => {
  app.use('/api', require('./auth.routes'))
  app.use('/api/user', require('./user.routes'))
  app.use('/api/customer', require('./customer.routes'))
  app.use('/api/upload', require('./uploads.routes'))
}