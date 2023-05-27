const { Pool } = require("pg")
require('dotenv').config();


const db = new Pool ({
  host: '18.219.111.8',
  user: 'postgres',
  password: '0000',
  port: 5432,
  database: process.env.DB_NAME,
  })

  // db.on('error', (err, client) => {
  //   console.error('Unexpected error on idle client', err)
  //   process.exit(-1)
  // })

  // db.on('connect', client => {
  //   console.log('Connected to database: ', client.database)
  // })

  db.connect((err) => {
    if (err) {
      console.log('err', err)
    } else {
      console.log(`Connected to database: ${process.env.DB_NAME}`)
    }
  });

module.exports = db;
