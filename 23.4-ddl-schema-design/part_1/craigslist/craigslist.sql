-- this code was generated after creating an ERD diagram using the vscode extension ERD Editor
-- I made the ERD diagram myself but copied the generated code

DROP DATABASE IF EXISTS craigslist_db;
CREATE DATABASE craigslist_db;

\c craigslist_db   
        

        
CREATE TABLE category
(
  id            int         NOT NULL GENERATED ALWAYS AS IDENTITY,
  category_name varchar(50) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE craigslist_user
(
  id          int         NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_region int         NOT NULL,
  username    varchar(30) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE post
(
  id            int         NOT NULL GENERATED ALWAYS AS IDENTITY,
  post_category int         NOT NULL,
  post_region   int         NOT NULL,
  user_id       int         NOT NULL,
  post_title    varchar(30) NOT NULL,
  post_text     text        NOT NULL,
  post_location text       ,
  PRIMARY KEY (id)
);

CREATE TABLE region
(
  id           int          NOT NULL GENERATED ALWAYS AS IDENTITY,
  city_name    varchar(100),
  country_name varchar(100) NOT NULL UNIQUE,
  state_code   varchar(2)   UNIQUE,
  PRIMARY KEY (id)
);

ALTER TABLE craigslist_user
  ADD CONSTRAINT FK_region_TO_craigslist_user
    FOREIGN KEY (user_region)
    REFERENCES region (id);

ALTER TABLE post
  ADD CONSTRAINT FK_craigslist_user_TO_post
    FOREIGN KEY (user_id)
    REFERENCES craigslist_user (id);

ALTER TABLE post
  ADD CONSTRAINT FK_region_TO_post
    FOREIGN KEY (post_region)
    REFERENCES region (id);

ALTER TABLE post
  ADD CONSTRAINT FK_category_TO_post
    FOREIGN KEY (post_category)
    REFERENCES category (id);
