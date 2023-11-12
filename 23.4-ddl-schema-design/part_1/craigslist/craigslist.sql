DROP DATABASE IF EXISTS craigslist;
CREATE DATABASE craigslist;

\c craigslist
        
CREATE TABLE category
(
  id            int         NOT NULL,
  category_name varchar(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE craigslist_user
(
  id        int         NOT NULL,
  username  varchar(30) NOT NULL,
  region_id int         NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE post
(
  id            int         NOT NULL,
  user_id       int         NOT NULL,
  post_title    varchar(30) NOT NULL,
  post_text     text        NOT NULL,
  post_location text       ,
  region_id     int         NOT NULL,
  category_id   int         NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE region
(
  id        int         NOT NULL,
  city_name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE craigslist_user
  ADD CONSTRAINT FK_region_TO_craigslist_user
    FOREIGN KEY (region_id)
    REFERENCES region (id);

ALTER TABLE post
  ADD CONSTRAINT FK_craigslist_user_TO_post
    FOREIGN KEY (user_id)
    REFERENCES craigslist_user (id);

ALTER TABLE post
  ADD CONSTRAINT FK_region_TO_post
    FOREIGN KEY (region_id)
    REFERENCES region (id);

ALTER TABLE post
  ADD CONSTRAINT FK_category_TO_post
    FOREIGN KEY (category_id)
    REFERENCES category (id);