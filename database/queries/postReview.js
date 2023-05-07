const db = require('../index.js');
const Promise = require("bluebird");

const postReview = function(data) {

  var query = `
  INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email, helpfulness)
  VALUES (${data.product_id}, ${data.rating}, current_timestamp, '${data.summary}', '${data.body}', ${data.recommend}, '${data.reviewer_name}', '${data.reviewer_email}', 0)
  RETURNING review_id
  `

  return db.query(query)
  .then((response) => {
    var review_id = response.rows[0].review_id;
    console.log('review_id', review_id)
    var characteristics = Object.values(JSON.parse(data.characteristics));
    characteristics.forEach((characteristic) => {
      var query =  `
      INSERT INTO characteristics_reviews(characteristic_id, review_id, value)
      VALUES (${characteristic.id}, ${review_id}, ${characteristic.value})
      `
      db.query(query)
      .then(() => {
        console.log('characteristics posted in characteristics_reviews')
      })
      .catch((err) => {
        console.log('error postReview in characteristics_reviews database', err)
      })
    })

    return review_id;
  })
  .then((review_id) => {
     if (data.photos) {
      var photos = JSON.parse(data.photos);
      photos.forEach((photo) => {
        var query = `
        INSERT INTO reviews_photos(review_id, url)
        VALUES (${review_id}, '${photo}')
        `
        db.query(query)
        .then(() => {
          console.log('photo posted to reviews_photos database')
        })
        .catch((err) => {
          console.log('error postReview in reviews_photos database', err)
        })
      })
     }
     return;
  })
  .catch((err) => {
    console.log('error postReview in reviews database', err);
  });

}

module.exports = postReview;