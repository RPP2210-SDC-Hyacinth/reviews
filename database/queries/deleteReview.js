const db = require('../index.js');
const Promise = require("bluebird");

const deleteReview = async function(review_id) {

  const query = `
  DELETE FROM characteristics_reviews WHERE review_id = ${review_id};
  DELETE FROM reviews_photos WHERE review_id = ${review_id};
  DELETE FROM reviews WHERE review_id = ${review_id};
  `

  return await db.query(query)
  .then((result) => {
    return result.rows
  })
  .catch((err) => {
    console.log('error delete review in database', err)
  })

}

module.exports = deleteReview;