const db = require('../index.js');
const Promise = require("bluebird");

const markHelpful = function(review_id) {

    const query = `
      UPDATE reviews
      SET helpfulness = helpfulness + 1
      WHERE review_id = ${review_id}
      RETURNING helpfulness
    `
    return db.query(query)
    .then((result) => {
      return result.rows[0]
    })
    .catch((err) => {
      console.log('error mark review helpful in database', err)
    })

}

module.exports = markHelpful;