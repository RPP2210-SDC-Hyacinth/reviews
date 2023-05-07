const { Pool } = require("pg")
require('dotenv').config();


const db = new Pool ({
  host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  })

  db.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

  db.on('connect', client => {
    console.log('Connected to database: ', client.database)
  })

module.exports = db;