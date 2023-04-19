require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/SDC-Reviews', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const Schema = mongoose.Schema;

const Reviews = new Schema ({
  review_id: {type: Number, required: true, unique: true},
  product_id: {type: Number, required: true},
  rating: Number,
  recommended: Boolean,
  summary: String,
  body: String,
  date: String,
  reviewer_name: String,
  helpfulness: Number,
  photos: [{
    photo_id: {type: Number, required: true, unique: true},
    url: String
  }]
})

const RatingsRecommended = new Schema ({
  product_id: {type: Number, required: true, unique: true},
  '1': Number,
  '2': Number,
  '3': Number,
  '4': Number,
  '5': Number,
  isRecommended: Number,
  notRecommended: Number,
  characteristics: {
    id: {type: Number, required: true, unique: true},
    character: String,
    value: String
  }
})

// const Characteristics = new Schema ({
//   id: {type: Number, required: true, unique: true},
//   product_id: {type: Number, required: true},
//   character: String,
//   value: String
// })

module.exports.Reviews = Reviews;
module.exports.RatingsRecommended = RatingsRecommended;