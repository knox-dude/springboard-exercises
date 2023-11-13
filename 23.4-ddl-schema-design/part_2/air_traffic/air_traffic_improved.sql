-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic
        
CREATE TABLE airline
(
  id           INT  NOT NULL GENERATED ALWAYS AS IDENTITY,
  airline_name TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE flight
(
  id           INT       NOT NULL GENERATED ALWAYS AS IDENTITY,
  airline_id   INT       NOT NULL,
  departure    TIMESTAMP NOT NULL,
  arrival      TIMESTAMP NOT NULL,
  to_city      TEXT      NOT NULL,
  to_country   TEXT      NOT NULL,
  from_city    TEXT      NOT NULL,
  from_country TEXT      NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE passenger
(
  id         INT  NOT NULL GENERATED ALWAYS AS IDENTITY,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE tickets
(
  id           INT  NOT NULL GENERATED ALWAYS AS IDENTITY,
  seat         TEXT NOT NULL,
  passenger_id INT  NOT NULL,
  flight_id    INT  NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE tickets
  ADD CONSTRAINT FK_passenger_TO_tickets
    FOREIGN KEY (passenger_id)
    REFERENCES passenger (id);

ALTER TABLE tickets
  ADD CONSTRAINT FK_flight_TO_tickets
    FOREIGN KEY (flight_id)
    REFERENCES flight (id);

ALTER TABLE flight
  ADD CONSTRAINT FK_airline_TO_flight
    FOREIGN KEY (airline_id)
    REFERENCES airline (id);