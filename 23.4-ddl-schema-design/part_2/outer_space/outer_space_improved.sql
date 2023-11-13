DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space
        
CREATE TABLE galaxy
(
  id          INT  NOT NULL GENERATED ALWAYS AS IDENTITY,
  galaxy_name TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE moon
(
  id        INT  NOT NULL GENERATED ALWAYS AS IDENTITY,
  moon_name TEXT NOT NULL,
  planet_id INT  NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE planet
(
  id                      INT   GENERATED ALWAYS AS IDENTITY,
  name                    TEXT  NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  star_id                 INT   NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE star
(
  id        INT  NOT NULL GENERATED ALWAYS AS IDENTITY,
  star_name TEXT NOT NULL,
  galaxy_id INT  NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE moon
  ADD CONSTRAINT FK_planet_TO_moon
    FOREIGN KEY (planet_id)
    REFERENCES planet (id);

ALTER TABLE star
  ADD CONSTRAINT FK_galaxy_TO_star
    FOREIGN KEY (galaxy_id)
    REFERENCES galaxy (id);

ALTER TABLE planet
  ADD CONSTRAINT FK_star_TO_planet
    FOREIGN KEY (star_id)
    REFERENCES star (id);

        
      