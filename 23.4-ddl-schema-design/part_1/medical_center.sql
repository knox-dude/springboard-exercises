DROP DATABASE IF EXISTS med_center_db;
CREATE DATABASE med_center_db;

\c med_center_db

CREATE TABLE diagnosis
(
  id      SERIAL PRIMARY KEY,
  visit_id INTEGER NOT NULL
);

CREATE TABLE disease
(
  id           SERIAL PRIMARY KEY,
  diagnosis_id INTEGER NOT NULL,
  disease_name TEXT
);

CREATE TABLE doctor
(
  id          SERIAL PRIMARY KEY,
  center_id   INTEGER NOT NULL,
  doctor_name TEXT
);

CREATE TABLE med_center
(
  id          SERIAL PRIMARY KEY,
  center_name TEXT 
);

CREATE TABLE patient
(
  id         SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name  TEXT
);

CREATE TABLE visits
(
  id         SERIAL PRIMARY KEY,
  doctor_id  INTEGER NOT NULL,
  patient_id INTEGER NOT NULL,
  visit_date DATE NOT NULL
);

ALTER TABLE doctor
  ADD CONSTRAINT FK_center
    FOREIGN KEY (center_id)
    REFERENCES med_center (id);

ALTER TABLE visits
  ADD CONSTRAINT FK_doctor
    FOREIGN KEY (doctor_id)
    REFERENCES doctor (id);

ALTER TABLE visits
  ADD CONSTRAINT FK_patient
    FOREIGN KEY (patient_id)
    REFERENCES patient (id);

ALTER TABLE diagnosis
  ADD CONSTRAINT FK_visits
    FOREIGN KEY (visit_id)
    REFERENCES visits (id);

ALTER TABLE disease
  ADD CONSTRAINT FK_diagnosis
    FOREIGN KEY (diagnosis_id)
    REFERENCES diagnosis (id);
