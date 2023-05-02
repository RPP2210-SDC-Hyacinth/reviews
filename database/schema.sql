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
  review_id INT NOT NULL,
  product_id INT NOT NULL,
  rating INT,
  date bigint,
  summary VARCHAR,
  body VARCHAR(1000),
  recommended boolean,
  reported boolean DEFAULT(false),
  reviewer_name VARCHAR,
  reviewer_email VARCHAR,
  response VARCHAR DEFAULT(null),
  helpfulness INT DEFAULT(0),
  PRIMARY KEY (review_id)
);

CREATE TABLE reviews_photos (
  photo_id INT NOT NULL,
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

CREATE TABLE characteristics_reviews(
  char_review_id INT NOT NULL,
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