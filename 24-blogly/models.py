"""Models for Blogly."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.orm import backref

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
  posts = db.relationship('Post', backref='user')

  def __repr__(self):
    return f"<User {self.id}: {self.first_name} {self.last_name}>"
  
class Post(db.Model):
  """Post."""

  __tablename__ = "posts"

  id = db.Column(db.Integer,
                 primary_key=True,
                 autoincrement=True)
  title = db.Column(db.String(30),
                    nullable=False)
  content = db.Column(db.Text,
                      nullable=False)
  updated_at = db.Column(db.DateTime,
                         default=datetime.utcnow(),
                         onupdate=datetime.utcnow())
  user_id = db.Column(db.Integer,
                      db.ForeignKey('users.id', ondelete="CASCADE"))
  def __repr__(self):
    return f"<Post {self.id}: {self.title} by user {self.user.first_name} {self.user.last_name}>"
  
  def getUpdatedAt(self):
    return f"Updated {self.updated_at.strftime('%d %b %Y, %I:%M%p')}"
  
  def getTagList(self):
    tag_list = []
    for tag in self.tags:
      tag_list.append(tag.name)
    return tag_list
  
class PostTag(db.Model):
  """PostTag - links Post and Tag"""

  __tablename__ = "posts_tags"

  post_id = db.Column(db.Integer,
                      db.ForeignKey('posts.id', ondelete="CASCADE"),
                      primary_key=True)
  tag_id = db.Column(db.Integer,
                     db.ForeignKey('tags.id', ondelete="CASCADE"),
                     primary_key=True)
  def __repr__(self) -> str:
    return f"<PostTag post: {self.post_id} tag: {self.tag_id}>"

class Tag(db.Model):
  """Tag."""

  __tablename__ = "tags"

  id = db.Column(db.Integer,
                 primary_key=True,
                 autoincrement=True)
  name = db.Column(db.Text,
                   nullable=False,
                   unique=True)
  posts = db.relationship('Post',
                          secondary="posts_tags",
                          backref="tags")
  def __repr__(self) -> str:
    return f"<Tag {self.id} name: {self.name}>"


