const db = require('../index.js');
const Promise = require("bluebird");

const getMetadata = function(product_id) {

  return new Promise ((resolve, reject) => {
    const query = `
    SELECT
    (
      SELECT count(*)
      FROM reviews r
      WHERE r.product_id = reviews.product_id
    ) as counts,
    (
      SELECT avg(r.rating)
      FROM reviews r
      WHERE r.product_id = reviews.product_id
    ) as averageRating,
    (
      SELECT count(r.recommended)
      FROM reviews r
      WHERE r.product_id = reviews.product_id AND r.recommended = TRUE
    ) as recommended,
    ( SELECT array_to_json(array_agg(star))
      FROM
      (
        SELECT r.rating, count(r.rating)
        FROM reviews r
        WHERE r.product_id = reviews.product_id
        group by r.rating
      ) star
    ) as starBreakdown,
    ( SELECT array_to_json(array_agg(characteristic))
      FROM
      (
        SELECT c.name, avg(cr.value) as value
        FROM characteristics c
        INNER JOIN characteristics_reviews cr
        ON c.characteristic_id = cr.characteristic_id
        WHERE c.product_id = reviews.product_id
        GROUP BY c.characteristic_id
      ) characteristic
    ) as characteristics
    FROM reviews
    WHERE reviews.product_id = ${product_id}
    GROUP BY reviews.product_id
    `

    db.query(query, (err, result) => {
      if (err) {
        reject('error retreving metadata', err);
      } else {
        // console.log(result.rows)
        resolve(result.rows[0])
      }
    })
  })
}

module.exports = getMetadata;