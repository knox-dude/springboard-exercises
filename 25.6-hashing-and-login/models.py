"""Models for User Authentication app."""

from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime
# from sqlalchemy.orm import backref
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

db = SQLAlchemy()

def connect_db(app):
  """Connect to database."""
  db.app = app
  db.init_app(app)

class User(db.Model):
  """User model."""

  __tablename__ = "users"

  username = db.Column(db.String(20), primary_key=True)
  
  password = db.Column(db.Text, nullable=False)

  email = db.Column(db.String(50), nullable=False, unique=True)

  first_name = db.Column(db.String(30), nullable=False)

  last_name = db.Column(db.String(30), nullable=False)

  def __repr__(self):
    return f"User {self.username}"
  
  @classmethod
  def register(cls, username, pwd):
    """Register user w/hashed password & return user."""

    hashed = bcrypt.generate_password_hash(pwd)
    # turn bytestring into normal (unicode utf8) string
    hashed_utf8 = hashed.decode("utf8")

    # return instance of user w/username and hashed pwd
    return cls(username=username, password=hashed_utf8)
  
  @classmethod
  def authenticate(cls, username, pwd):
    """Validate that user exists & password is correct.

    Return user if valid; else return False.
    """

    u = User.query.filter_by(username=username).first()

    if u and bcrypt.check_password_hash(u.password, pwd):
      # return user instance
      return u
    else:
      return False
  