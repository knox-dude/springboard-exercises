DROP DATABASE IF EXISTS soccer_league_db;
CREATE DATABASE soccer_league_db;

\c soccer_league_db


        
CREATE TABLE game
(
  id           int NOT NULL GENERATED ALWAYS AS IDENTITY,
  win_team_id  int NOT NULL,
  lose_team_id int NOT NULL,
  season_id    int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE game_officials
(
  (game_id, ref_id) int NOT NULL GENERATED ALWAYS AS IDENTITY,
  ref_id            int NOT NULL,
  game_id           int NOT NULL,
  PRIMARY KEY ((game_id, ref_id))
);

CREATE TABLE goal
(
  id        int NOT NULL GENERATED ALWAYS AS IDENTITY,
  game_id   int NOT NULL,
  player_id int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE player
(
  id      int NOT NULL GENERATED ALWAYS AS IDENTITY,
  team_id int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE referee
(
  id         int          NOT NULL GENERATED ALWAYS AS IDENTITY,
  first_name varchar(40)  NOT NULL,
  last_name  varchar(100),
  PRIMARY KEY (id)
);

CREATE TABLE season
(
  id         int  NOT NULL GENERATED ALWAYS AS IDENTITY,
  start_date date NOT NULL,
  end_date   date NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE team
(
  id        int         NOT NULL GENERATED ALWAYS AS IDENTITY,
  team_name varchar(30) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

ALTER TABLE player
  ADD CONSTRAINT FK_team_TO_player
    FOREIGN KEY (team_id)
    REFERENCES team (id);

ALTER TABLE goal
  ADD CONSTRAINT FK_player_TO_goal
    FOREIGN KEY (player_id)
    REFERENCES player (id);

ALTER TABLE goal
  ADD CONSTRAINT FK_game_TO_goal
    FOREIGN KEY (game_id)
    REFERENCES game (id);

ALTER TABLE game
  ADD CONSTRAINT FK_team_TO_game
    FOREIGN KEY (win_team_id)
    REFERENCES team (id);

ALTER TABLE game
  ADD CONSTRAINT FK_team_TO_game1
    FOREIGN KEY (lose_team_id)
    REFERENCES team (id);

ALTER TABLE game_officials
  ADD CONSTRAINT FK_game_TO_game_officials
    FOREIGN KEY (game_id)
    REFERENCES game (id);

ALTER TABLE game_officials
  ADD CONSTRAINT FK_referee_TO_game_officials
    FOREIGN KEY (ref_id)
    REFERENCES referee (id);

ALTER TABLE game
  ADD CONSTRAINT FK_season_TO_game
    FOREIGN KEY (season_id)
    REFERENCES season (id);

        
      