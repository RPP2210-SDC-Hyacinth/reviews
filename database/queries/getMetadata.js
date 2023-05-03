const db = require('../index.js');
const Promise = require("bluebird");

const getMetadata = function(product_id) {

  const metadata = function(product_id, data) {
    var counts = data.counts;
    var averageRating = data.averagerating;

    var ratings = data.ratings.reduce((object, rating) => {
      object[rating.rating] = rating.count;
      return object;
    }, {})

    var recommended = {1: data.recommend}
    var characteristics = data.characteristics.reduce((object, characteristic) => {
      object[characteristic.name] = {id: characteristic.id, value: characteristic.value};
      return object;
    }, {})

    return {product_id, counts, averageRating, ratings, recommended, characteristics}
  }

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
      SELECT count(r.recommend)
      FROM reviews r
      WHERE r.product_id = reviews.product_id AND r.recommend = TRUE
    ) as recommend,
    ( SELECT array_to_json(array_agg(star))
      FROM
      (
        SELECT r.rating, count(r.rating)
        FROM reviews r
        WHERE r.product_id = reviews.product_id
        group by r.rating
      ) star
    ) as ratings,
    ( SELECT array_to_json(array_agg(characteristic))
      FROM
      (
        SELECT c.characteristic_id as id, c.name, avg(cr.value) as value
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



    // SELECT r.rating
    // FROM reviews r
    // WHERE r.product_id = ${product_id}
    // GROUP BY rating


    // const query = `
    // SELECT (
    // SELECT jsonb_agg(xx)
    // FROM (
    // SELECT json_object_agg(r3.rating,
    //   ( SELECT count(r2.rating)
    //     FROM reviews r2
    //     WHERE r2.product_id = reviews.product_id
    //   )
    // ) as counts
    // FROM reviews r3
    // WHERE r3.product_id = reviews.product_id
    // GROUP BY r3.rating
    // ) as xx
    // ) ratings

    // FROM reviews
    // WHERE reviews.product_id = ${product_id}
    // group by reviews.product_id
    // `
    db.query(query, (err, result) => {
      if (err) {
        reject('error retreving metadata', err);
      } else {
        resolve(metadata(product_id, result.rows[0]))
        // resolve(result.rows[0])
      }
    })
  })
}

module.exports = getMetadata;