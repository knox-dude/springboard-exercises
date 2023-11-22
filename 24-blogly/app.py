"""Blogly application."""

from flask import Flask, request, redirect, render_template
from models import db, connect_db, User, Post
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

@app.route("/")
def home_page():
  """Redirects to list of users"""
  return redirect("/users")

@app.route("/users/new")
def show_add_user_page():
  return render_template("add_user.html")

@app.route("/users/new", methods=["POST"])
def add_user():
  """Add user and redirect to list."""

  first_name = request.form['first_name']
  last_name = request.form['last_name']
  image_url = request.form['image_url']
  if image_url == "":
    image_url="https://static.thenounproject.com/png/574704-200.png"
  user = User(first_name=first_name, last_name=last_name, image_url=image_url)
  db.session.add(user)
  db.session.commit()

  return redirect("/users")

@app.route("/users")
def list_users():
  """List users and show link to add form."""
  
  users = User.query.all()
  return render_template("list.html", users=users)

@app.route("/users/<int:user_id>")
def list_single_user(user_id):
  """Show info on a single user."""

  user = User.query.get_or_404(user_id)
  user_posts = user.posts
  return render_template("detail.html", user=user, posts=user_posts)

@app.route("/users/<int:user_id>/edit")
def show_edit_user(user_id):
  """Shows the edit page for a single user."""

  user = User.query.get_or_404(user_id)
  return render_template("edit_user.html", user=user)

@app.route("/users/<int:user_id>/edit", methods=["POST"])
def edit_user(user_id):
  """Sends a post request to edit a single user."""

  user = User.query.get_or_404(user_id)

  first_name = request.form['first_name']
  last_name = request.form['last_name']
  image_url = request.form['image_url']
  if image_url == "":
    image_url = "https://static.thenounproject.com/png/574704-200.png"

  user.first_name = first_name
  user.last_name = last_name
  user.image_url = image_url

  db.session.commit()

  return redirect("/users")

@app.route("/users/<int:user_id>/delete", methods=["POST"])
def delete_user(user_id):
  """Deletes a user."""

  user = User.query.get(user_id)
  if user == None:
    return redirect("/users")
  User.query.filter_by(id=user_id).delete()
  db.session.commit()
  return redirect("/users")

@app.route("/posts/<int:post_id>")
def show_post(post_id):
  """Shows single post"""

  post = Post.query.get_or_404(post_id)
  return render_template("post.html", post=post)

@app.route("/posts/<int:post_id>/edit")
def show_edit_post_page(post_id):
  """Shows post edit page"""

  post = Post.query.get_or_404(post_id)
  return render_template("edit_post.html", post=post)

@app.route("/posts/<int:post_id>/edit", methods=["POST"])
def edit_post(post_id):
  """Edits a post"""

  post = Post.query.get_or_404(post_id)

  title = request.form['title']
  content = request.form['content']

  post.title = title
  post.content = content

  db.session.commit()
  return redirect(f"/posts/{post_id}")

@app.route("/posts/<int:post_id>/delete", methods=["POST"])
def delete_post(post_id):
  """Deletes a post"""

  post = Post.query.get(post_id)
  if post == None:
    return redirect("/users")
  Post.query.filter_by(id=post_id).delete()
  db.session.commit()
  return redirect(f"/users/{post.user_id}")

@app.route("/users/<int:user_id>/posts/new")
def add_new_post(user_id):
  """Adds a new post"""

  user = User.query.get_or_404(user_id)
  return render_template("new_post.html", user=user)

@app.route("/users/<int:user_id>/posts/new", methods=["POST"])
def add_new_post_post(user_id):
  """Adds a new post for specified user"""
  title = request.form['title']
  content = request.form['content']
  post = Post(title=title, content=content, user_id=user_id)

  db.session.add(post)
  db.session.commit()

  return redirect(f"/users/{user_id}")


if os.environ.get("TESTING") is None:
  connect_db(app)
