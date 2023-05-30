const getReviews = require('../database/queries/getReviews.js');
const getMetadata = require('../database/queries/getMetadata.js');
const postReview = require('../database/queries/postReview.js');
const searchKeyword = require('../database/queries/searchKeyword.js');
const markHelpful = require('../database/queries/markHelpful.js');
const reportReview = require('../database/queries/reportReview.js');
const deleteReview = require('../database/queries/deleteReview.js');

const { createClient } = require('redis');
const redis = createClient();

(async () => {
  redis.on("error", (error) => console.log('Error :', error));
  await redis.connect();
})();

exports.getReviews = async (req, res) => {
try {
  var data = req.query;

  const cache = await redis.get(`product_id=${data.product_id} reviews`);

  if (cache) {
    res.status(200).send(JSON.parse(cache));
  } else {
    getReviews(data)
    .then(async (response) => {
      await redis.set(`product_id=${data.product_id} reviews`, JSON.stringify(response));
      res.status(200).send(response);
    })
    .catch((err) => {
    res.status(404).send('error getReviews', err)
    })
  }
} catch (err) { console.log(err)};
};

exports.getMetadata = async (req, res) => {

  var product_id = req.query.product_id;

  const cache = await redis.get(`product_id=${product_id} reviews Metadata`);

  if (cache) {
    res.status(200).send(JSON.parse(cache));
  }  else {
    getMetadata(product_id)
    .then(async (response) => {
      await redis.set(`product_id=${product_id} reviews Metadata`, JSON.stringify(response));
      res.status(200).send(response);
    })
    .catch((err) => {
        res.status(404).send('error getMetadata', err)
    })
  }

}

exports.postReview = function(req, res) {
  var data = req.query;
  postReview(data)
  .then((response) => {
    res.status(201).send('review posted successfully')
  })
  .catch((err) => {
    res.status(404).send('error postReview', err)
  })
}

exports.search = function(req, res) {
  var data = req.query;
  searchKeyword(data)
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((err) => {
    res.status(404).send('error search keyword', err)
  })
}

exports.markHelpful = function(req, res) {
  var review_id = req.query.review_id;

  markHelpful(review_id)
  .then((response) => {
    res.send(response)
  })
  .catch((err) => {
    res.status(404).send('error mark review helpful', err)
  })
}

exports.reportReview = function(req, res) {
  var review_id = req.query.review_id;

  reportReview(review_id)
  .then((response) => {
    res.send(response)
  })
  .catch((err) => {
    res.status(404).send('error reportReview', err)
  })
}

exports.deleteReview = function(req, res) {
  var review_id = req.query.review_id;
  deleteReview(review_id)
  .then((response) => {
    res.send('review deleted successfully')
  })
  .catch((err) => {
    res.status(404).send('error deleteReview', err)
  })
}
