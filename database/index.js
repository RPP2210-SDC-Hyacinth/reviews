const { Client } = require("pg")
require('dotenv').config();


const db = new Client({
  host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  })
  db.connect((err) => {
    if (err) {
      console.log('Error connecting to database', err)
    } else {
      console.log('Connected to database: ', db.database)
    }
  })

module.exports = db;