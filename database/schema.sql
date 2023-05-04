DROP DATABASE IF EXISTS sdc CASCADE;

CREATE DATABASE sdc;


\c SDC;

CREATE TABLE IF NOT EXISTS products (
  product_id INT NOT NULL,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price INT,
  PRIMARY KEY (product_id)
);

CREATE TABLE reviews (
  review_id SERIAL UNIQUE PRIMARY KEY,
  product_id INT NOT NULL,
  rating INT,
  date bigint,
  summary VARCHAR,
  body VARCHAR(1000),
  recommend boolean,
  reported boolean DEFAULT(false),
  reviewer_name VARCHAR,
  reviewer_email VARCHAR,
  response VARCHAR DEFAULT(null),
  helpfulness INT DEFAULT(0)
);

CREATE TABLE reviews_photos (
  photo_id SERIAL,
  review_id INT NOT NULL,
  url VARCHAR NOT NULL,
  PRIMARY KEY (photo_id)
);

CREATE TABLE characteristics (
  characteristic_id INT NOT NULL,
  product_id INT NOT NULL,
  name CHAR(10) NOT NULL,
  PRIMARY KEY (characteristic_id)
);

CREATE TABLE characteristics_reviews (
  char_review_id SERIAL,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value INT NOT NULL,
  PRIMARY KEY (char_review_id)
);

ALTER TABLE reviews ADD FOREIGN KEY (product_id) REFERENCES products (product_id);
ALTER TABLE reviews_photos ADD FOREIGN KEY (review_id) REFERENCES reviews (review_id);
ALTER TABLE characteristics ADD FOREIGN KEY (product_id) REFERENCES products (product_id);
ALTER TABLE characteristics_reviews ADD FOREIGN KEY (characteristic_id) REFERENCES characteristics (characteristic_id);
ALTER TABLE characteristics_reviews ADD FOREIGN KEY (review_id) REFERENCES reviews (review_id);

ALTER TABLE reviews ALTER COLUMN date TYPE timestamp without time zone USING TO_TIMESTAMP(date/1000);

\copy reviews from /Users/linlin/Hack-Reactor/Reviews/datas/reviews.csv delimiter',' CSV HEADER;
\copy reviews_photos from '/Users/linlin/Hack-Reactor/Reviews/datas/reviews_photos.csv' delimiter',' CSV HEADER;
\copy characteristics from '/Users/linlin/Hack-Reactor/Reviews/datas/characteristics.csv' delimiter',' CSV HEADER;
\copy characteristics_reviews from '/Users/linlin/Hack-Reactor/Reviews/datas/characteristic_reviews.csv' delimiter',' CSV HEADER;

SELECT setval(pg_get_serial_sequence('reviews', 'review_id'), max(review_id)) FROM reviews;
SELECT setval(pg_get_serial_sequence('reviews_photos', 'photo_id'), max(photo_id)) FROM reviews_photos;
SELECT setval(pg_get_serial_sequence('characteristics', 'characteristic_id'), max(characteristic_id)) FROM characteristics;
SELECT setval(pg_get_serial_sequence('characteristics_reviews', 'char_review_id'), max(char_review_id)) FROM characteristics_reviews;