"""Models for Blogly."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

def connect_db(app):
  """Connect to database."""
  db.app = app
  db.init_app(app)

class User(db.Model):
  """User."""

  __tablename__ = "users"

  id = db.Column(db.Integer,
                 primary_key=True,
                 autoincrement=True)
  first_name = db.Column(db.Text,
                         nullable=False)
  last_name = db.Column(db.Text,
                        nullable=False)
  image_url = db.Column(db.Text,
                        nullable=False,
                        default="https://static.thenounproject.com/png/574704-200.png")
  posts = db.relationship('Post', backref=db.backref('user', uselist=False))

  def __repr__(self):
    return f"<User {self.id}: {self.first_name} {self.last_name}>"
  
class Post(db.Model):
  """Post."""

  __tablename__ = "posts"

  def __repr__(self):
    return f"<Post {self.id}: {self.title} by user {self.user.first_name} {self.user.last_name}>"

  id = db.Column(db.Integer,
                 primary_key=True,
                 autoincrement=True)
  title = db.Column(db.String(30),
                    nullable=False)
  content = db.Column(db.Text,
                      nullable=False)
  created_at = db.Column(db.DateTime,
                         default=datetime.utcnow())
  user_id = db.Column(db.Integer,
                      db.ForeignKey('users.id'))
