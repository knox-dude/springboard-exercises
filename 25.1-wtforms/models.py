from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.orm import backref

db = SQLAlchemy()

def connect_db(app):
  """Connect to database."""
  db.app = app
  db.init_app(app)

class Pet(db.Model):

  __tablename__ = "pets"

  id = db.Column(db.Integer,
                 primary_key=True,
                 autoincrement=True)
  name = db.Column(db.Text,
                   nullable=False)
  species = db.Column(db.Text,
                      nullable=False)

  age = db.Column(db.Integer)

  notes = db.Column(db.Text)

  available = db.Column(db.Boolean)

  photo_url = db.Column(db.Text,
                        default="https://static.thenounproject.com/png/574704-200.png")