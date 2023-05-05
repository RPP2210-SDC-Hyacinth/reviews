// const db = require( './database/index.js');
const getReviews = require('../database/queries/getReviews.js');
const getMetadata = require('../database/queries/getMetadata.js');
const postReview = require('../database/queries/postReview.js');

exports.getReviews = function(req, res) {

    var query = req.query;

    getReviews(query)
    .then((response) => {
        res.send(response);
    })
    .catch((err) => {
        console.log('error getReviews', err)
    })
};

exports.getMetadata = function(req, res) {

    var query = req.params.product_id;

    getMetadata(query)
    .then((response) => {
        res.send(response);
    })
    .catch((err) => {
        console.log('error getMetadata', err)
    })
}

exports.postReview = function(req, res) {
  var query = req.query;
  postReview(query)
  .then(() => {
    res.send('review posted successfully')
  })
  .catch(() => {
    console.log('error postReview', err)
  })
}