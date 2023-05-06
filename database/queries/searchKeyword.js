const db = require('../index.js');
const Promise = require("bluebird");

const searchKeyword = function({ product_id, keyword }) {



  return new Promise((reject, resolve) => {

    var query = `
      WITH reviews AS (SELECT * FROM reviews WHERE product_id = ${product_id})

      SELECT *
      FROM reviews
      WHERE body LIKE '%${keyword}%' OR summary LIKE '%${keyword}%'
    `

    db.query(query, (err, result) => {
      if (err) {
        reject('error seaching keyword in database', err)
      } else {
        resolve(result.rows)
      }
    })
  })
}

module.exports = searchKeyword;