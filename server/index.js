require('dotenv').config();
require('newrelic');

const controller = require('./controllers.js');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.get('/reviews', controller.getReviews);

app.get('/reviews/metadata', controller.getMetadata);

app.get('/reviews/search', controller.search);

app.post('/reviews/postReview', controller.postReview);

app.put('/reviews/helpful', controller.markHelpful);

app.put('/reviews/report', controller.reportReview);

app.put('/reviews/delete', controller.deleteReview);

app.get('/loaderio-b021babf52edde1135762c72ce32ab2d.txt', (req, res) => {
  const options = {
    root: path.join(__dirname)
  };
  const fileName = 'loaderio-b021babf52edde1135762c72ce32ab2d  .txt';
  res.sendFile(fileName, options)
})


const port = 6000;

app.listen(port, () => {
  console.log('Listening on port: ', port)
});

module.exports = app