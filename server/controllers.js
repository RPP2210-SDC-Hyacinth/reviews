const getReviews = require('../database/queries/getReviews.js');
const getMetadata = require('../database/queries/getMetadata.js');
const postReview = require('../database/queries/postReview.js');
const searchKeyword = require('../database/queries/searchKeyword.js');
const markHelpful = require('../database/queries/markHelpful.js');
const reportReview = require('../database/queries/reportReview.js');
const deleteReview = require('../database/queries/deleteReview.js');

exports.getReviews = function(req, res) {

    var data = req.query;

    getReviews(data)
    .then((response) => {
        res.send(response);
    })
    .catch((err) => {
        res.send('error getReviews', err)
    })
};

exports.getMetadata = function(req, res) {

    var product_id = req.params.product_id;

    getMetadata(product_id)
    .then((response) => {
        res.send(response);
    })
    .catch((err) => {
        res.send('error getMetadata', err)
    })
}

exports.postReview = function(req, res) {
  var data = req.query;
  postReview(data)
  .then((response) => {
    res.send('review posted successfully')
  })
  .catch((err) => {
    res.send('error postReview', err)
  })
}

exports.search = function(req, res) {
    var data = req.query;
    searchKeyword(data)
    .then((response) => {
        res.send(response);
    })
    .catch((err) => {
        res.send('error search keyword', err)
    })
}

exports.markHelpful = function(req, res) {
    var review_id = req.query.review_id;

    markHelpful(review_id)
    .then((response) => {
        res.send('review marked helpful');
    })
    .catch((err) => {
        res.send('error mark review helpful', err)
    })
}

exports.reportReview = function(req, res) {
  var review_id = req.query.review_id;

  reportReview(review_id)
  .then((response) => {
    res.send('review reported successfully')
  })
  .catch((err) => {
    console.log('error reportReview', err)
  })
}

exports.deleteReview = function(req, res) {
    var review_id = req.query.review_id;
    deleteReview(review_id)
    .then((response) => {
        res.send('review deleted successfully')
    })
    .catch((err) => {
        console.log('error deleteReview', err)
    })
}