const db = require('../index.js');
const Promise = require("bluebird");

const searchKeyword = function({ product_id, keyword }) {

  var query = `
  WITH reviews AS (SELECT * FROM reviews WHERE product_id = ${product_id})

  SELECT *
  FROM reviews
  WHERE body LIKE '%${keyword}%' OR summary LIKE '%${keyword}%'
  `

  return db.query(query)
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(('error seaching keyword in database', err))
  })

}

module.exports = searchKeyword;