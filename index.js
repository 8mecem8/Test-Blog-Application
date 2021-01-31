const app = require('./app')
const http = require('http')
const config = require('./Utilities/config')
const logger = require('./Utilities/logger')

//------------------------------------------


const server = http.createServer(app)


server.listen(config.PORT, () => { logger.info(`Server running on port ${config.PORT}`)})

