const db = require('../index.js');
const Promise = require("bluebird");

const getMetadata = async function(product_id) {

  const query =  `
  SELECT json_build_object(
    'product_id', ${product_id},
    'counts', count(rating),
    'averageRating', avg(rating),
    'recommend', (
      SELECT json_build_object(1, ( SELECT count(r.recommend) FROM reviews r WHERE r.product_id = reviews.product_id AND r.recommend = TRUE))
    ),
    'ratings', (
      SELECT json_object_agg(
        r1.rating,
        (
          SELECT count(*)
          FROM reviews
          WHERE product_id = r1.product_id AND rating = r1.rating
        )
      )
      FROM reviews r1
      WHERE r1.product_id = reviews.product_id
    ),
    'characteristics', (
      SELECT json_object_agg(
        name, (
          SELECT json_build_object(
            'id', characteristic_id,
            'value', (
              SELECT avg(cr.value)
              FROM characteristics_reviews cr
              WHERE cr.characteristic_id = c.characteristic_id
            )
          )
          FROM characteristics c
          WHERE c.characteristic_id = characteristics.characteristic_id
        )
      )
      FROM characteristics
      WHERE characteristics.product_id = reviews.product_id
      GROUP BY characteristics.product_id
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
    console.log('error retreving metadata in database', err)
  })

}

module.exports = getMetadata;