
DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE artist
(
  id          INT  NOT NULL GENERATED ALWAYS AS IDENTITY,
  artist_name TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE producer
(
  id            INT  NOT NULL GENERATED ALWAYS AS IDENTITY,
  producer_name TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE song_credits
(
  id          INT NOT NULL GENERATED ALWAYS AS IDENTITY,
  artist_id   INT NOT NULL,
  song_id     INT NOT NULL,
  producer_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE songs
(
  id                  INT     GENERATED ALWAYS AS IDENTITY,
  title               TEXT    NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  release_date        DATE    NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE song_credits
  ADD CONSTRAINT FK_artist_TO_song_credits
    FOREIGN KEY (artist_id)
    REFERENCES artist (id);

ALTER TABLE song_credits
  ADD CONSTRAINT FK_songs_TO_song_credits
    FOREIGN KEY (song_id)
    REFERENCES songs (id);

ALTER TABLE song_credits
  ADD CONSTRAINT FK_producer_TO_song_credits
    FOREIGN KEY (producer_id)
    REFERENCES producer (id);

        
      