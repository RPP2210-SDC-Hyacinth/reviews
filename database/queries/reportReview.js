const db = require('../index.js');
const Promise = require("bluebird");

const reportReview = function(review_id) {

  return new Promise ((reject, resolve) => {

    const query = `
    UPDATE reviews
    SET reported = TRUE
    WHERE review_id = ${review_id}
    RETURNING reported
    `

    db.query(query, (err, result) => {
      if (err) {
        reject('error report review in database', err)
      } else {
        resolve(result.rows[0])
      }
    })
  })

}

module.exports = reportReview