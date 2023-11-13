DROP DATABASE IF EXISTS med_center_db;
CREATE DATABASE med_center_db;

\c med_center_db


        
CREATE TABLE diagnosis
(
  id       int  NOT NULL GENERATED ALWAYS AS IDENTITY,
  visit_id int  NOT NULL,
  notes    text NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE disease
(
  id           int  NOT NULL GENERATED ALWAYS AS IDENTITY,
  diagnosis_id int  NOT NULL,
  disease_name text,
  PRIMARY KEY (id)
);

CREATE TABLE doctor
(
  id         int  NOT NULL GENERATED ALWAYS AS IDENTITY,
  center_id  int  NOT NULL,
  first_name text NOT NULL,
  last_name  text NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE med_center
(
  id int NOT NULL GENERATED ALWAYS AS IDENTITY,
  PRIMARY KEY (id)
);

CREATE TABLE patient
(
  id         int  NOT NULL GENERATED ALWAYS AS IDENTITY,
  first_name text NOT NULL,
  last_name  text,
  PRIMARY KEY (id)
);

CREATE TABLE visits
(
  id         int  NOT NULL GENERATED ALWAYS AS IDENTITY UNIQUE,
  doctor_id  int  NOT NULL,
  patient_id int  NOT NULL,
  visit_date date,
  PRIMARY KEY (id)
);

ALTER TABLE doctor
  ADD CONSTRAINT FK_med_center_TO_doctor
    FOREIGN KEY (center_id)
    REFERENCES med_center (id);

ALTER TABLE visits
  ADD CONSTRAINT FK_doctor_TO_visits
    FOREIGN KEY (doctor_id)
    REFERENCES doctor (id);

ALTER TABLE visits
  ADD CONSTRAINT FK_patient_TO_visits
    FOREIGN KEY (patient_id)
    REFERENCES patient (id);

ALTER TABLE diagnosis
  ADD CONSTRAINT FK_visits_TO_diagnosis
    FOREIGN KEY (visit_id)
    REFERENCES visits (id);

ALTER TABLE disease
  ADD CONSTRAINT FK_diagnosis_TO_disease
    FOREIGN KEY (diagnosis_id)
    REFERENCES diagnosis (id);
    