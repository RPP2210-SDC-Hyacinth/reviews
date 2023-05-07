const db = require('../index.js');
const Promise = require("bluebird");

const reportReview = function(review_id) {

  const query = `
  UPDATE reviews
  SET reported = TRUE
  WHERE review_id = ${review_id}
  RETURNING reported
  `

  return db.query(query)
  .then((result) => {
    return result.rows[0]
  })
  .catch((err) => {
    console.log('error report review in database', err)
  })

}

module.exports = reportReview