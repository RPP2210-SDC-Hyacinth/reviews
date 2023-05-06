const db = require('../index.js');
const Promise = require("bluebird");

const deleteReview = function(review_id) {

  return new Promise ((reject, resolve) => {
    const query = `
      DELETE FROM characteristics_reviews WHERE review_id = ${review_id};
      DELETE FROM reviews_photos WHERE review_id = ${review_id};
      DELETE FROM reviews WHERE review_id = ${review_id};
    `
    db.query(query, (err, result) => {
      if (err) {
        reject('error delete review in database', err)
      } else {
        resolve(result.rows)
      }
    })
  })
}

module.exports = deleteReview;