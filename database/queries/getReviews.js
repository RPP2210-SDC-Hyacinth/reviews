const db = require('../index.js');
const Promise = require("bluebird");

const getReviews = function({ product_id, count, sort}) {

  if (sort === 'helpful') sort = 'r.helpfulness desc';
  if (sort === 'newest') sort ='r.date desc';
  if (sort === 'relevant') sort = 'r.helpfulness desc, r.date desc';

  return new Promise ((resolve, reject) => {

    const query = `
    SELECT r.review_id, r.rating, r.date, r.summary, r.body, r.recommend, r.reported, r.reviewer_name, r.reviewer_email, r.response, r.helpfulness,
      ( SELECT coalesce(json_agg(to_json(photo)), '[]')
        FROM
          (
            SELECT photo_id as id, url
            FROM reviews_photos
            INNER JOIN reviews
            ON reviews.review_id = reviews_photos.review_id
            WHERE reviews_photos.review_id = r.review_id
          ) photo
      ) as photos
      FROM reviews r
      WHERE r.product_id = ${product_id}
      order by ${sort}
      LIMIT ${count}
      ;`

      db.query(query, (err, result) => {
        if (err) {
          reject('error retreving reviews', err)
        } else {
          resolve({product_id, count, results:result.rows})
          // resolve(result.rows)
        }
      })
  })
}

module.exports = getReviews;
