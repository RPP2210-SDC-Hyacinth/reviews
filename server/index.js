require('dotenv').config();

const controller = require('./controllers.js');

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

app.get(`/${process.env.LOADER}`, (req, res) => {
  res.send(process.env.LOADER1);
})

const port = 6000;

app.listen(port,() => {
  console.log('Listening on port: ', port);
});

module.exports = app
