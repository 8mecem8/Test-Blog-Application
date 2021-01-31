const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./Utilities/logger')
const config = require('./Utilities/config')
const middleware = require('./utilities/middleware')
const router = require('./Controllers/routes')
const usersRouter = require('./Controllers/users')
const loginRouter = require('./Controllers/login')





mongoose.connect(config.DB_C, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })



app.use(cors())
app.use(express.json())
app.use(express.static('build'))



app.use('/api/blogs', router)
app.use('/api/users', usersRouter )
app.use('/api/login', loginRouter)











app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app