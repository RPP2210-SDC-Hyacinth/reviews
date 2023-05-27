const db = require('../index.js');
const Promise = require("bluebird");

const getReviews = async function(data) {

  let sort;
  if (data.sort === 'helpful')  sort = 'r.helpfulness desc';
  if (data.sort === 'newest')  sort ='r.date desc';
  if (data.sort === 'relevant' || !data.sort)  sort = 'r.helpfulness desc, r.date desc';

  let count = data.count || 2;
  let product_id = data.product_id

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
  return await db.query(query)
  .then((result) => {
    return result.rows[0].json_build_object
  })
  .catch((err) => {
    console.log('error retreving reviews in database', err)
  })
}

module.exports = getReviews;