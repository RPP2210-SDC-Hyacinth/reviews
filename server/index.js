require('dotenv').config();
const controller = require('./controllers.js');

const express = require('express');
const bodyParser = require('body-parser');
const port = 6000;
// const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());

app.get('/reviews/:product_id', controller.getReviews);

app.listen(port, () => {
  console.log('Listening on port: ', port)
});