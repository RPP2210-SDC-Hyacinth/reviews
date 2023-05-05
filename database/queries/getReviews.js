const db = require('../index.js');
const Promise = require("bluebird");

const getReviews = function({ product_id, count, sort}) {

  if (sort === 'helpful') sort = 'r.helpfulness desc';
  if (sort === 'newest') sort ='r.date desc';
  if (sort === 'relevant') sort = 'r.helpfulness desc, r.date desc';

  return new Promise ((resolve, reject) => {

    const query = `
    SELECT json_build_object(
      'product_id', ${product_id},
      'counts', ${count},
      'results', (
        SELECT json_agg(to_json(results))
        FROM
        (
          SELECT review_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness,
            (
              SELECT coalesce(json_agg(to_json(photo)), '[]')
              FROM
              (
                SELECT photo_id as id, url
                FROM reviews_photos
                INNER JOIN reviews r2
                ON r2.review_id = reviews_photos.review_id
                WHERE reviews_photos.review_id = r.review_id
              ) photo
            ) as photos
          FROM reviews r
          WHERE r.product_id = reviews.product_id
          ORDER BY ${sort}
          LIMIT ${count}
        ) results
      )
    )
    FROM reviews
    WHERE reviews.product_id = ${product_id}
    GROUP BY reviews.product_id
    `

    db.query(query, (err, result) => {
      if (err) {
        reject('error retreving reviews in database', err)
      } else {
        resolve(result.rows[0].json_build_object)
      }
    })
  })
}

module.exports = getReviews;
