require('dotenv/config')

const PORT = process.env.PORT || 3003

const DB_C = process.env.DB_C

const SECRET= process.env.SECRET

module.exports = {PORT, DB_C, SECRET}