require('dotenv').config();
const controller = require('./controllers.js');

const express = require('express');
const bodyParser = require('body-parser');
const port = 6000;
// const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());

app.get('/reviews/:product_id', controller.getReviews);

app.get('/reviews/:product_id/metadata', controller.getMetadata);

app.get('/reviews/:product_id/search', controller.search);

app.post('/reviews/:product_id/postReview', controller.postReview);

app.post('/reviews/:product_id/:review_id/helpful', controller.markHelpful);

app.post('/reviews/:product_id/:review_id/report', controller.reportReview);

app.post('/reviews/:product_id/:review_id/delete', controller.deleteReview);

app.listen(port, () => {
  console.log('Listening on port: ', port)
});