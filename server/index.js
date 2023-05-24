require('dotenv').config();
const controller = require('./controllers.js');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.get('/reviews/:product_id', controller.getReviews);

app.get('/reviews/metadata', controller.getMetadata);

app.get('/reviews/:product_id/search', controller.search);

app.post('/reviews/:product_id/postReview', controller.postReview);

app.put('/reviews/:product_id/helpful', controller.markHelpful);

app.put('/reviews/:product_id/report', controller.reportReview);

app.put('/reviews/:product_id/delete', controller.deleteReview);

app.get('/loaderio-9960bc98b37a711c02be52e225a31290.txt', (req, res) => {
  const options = {
    root: path.join(__dirname)
  };
  const fileName = 'loaderio-9960bc98b37a711c02be52e225a31290.txt';
  res.sendFile(fileName, options)
})


const port = 6000;

app.listen(port, () => {
  console.log('Listening on port: ', port)
});

module.exports = app
