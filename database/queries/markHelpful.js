const db = require('../index.js');
const Promise = require("bluebird");

const markHelpful = function(review_id) {

  return new Promise ((reject, resolve) => {
    const query = `
      UPDATE reviews
      SET helpfulness = helpfulness + 1
      WHERE review_id = ${review_id}
      RETURNING helpfulness
    `
    db.query(query, (err, result) => {
      if (err) {
        reject('error mark review helpful in database', err)
      } else {
        resolve(result.rows[0])
      }
    })
  })
}

module.exports = markHelpful;