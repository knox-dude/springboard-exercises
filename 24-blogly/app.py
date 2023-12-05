"""Blogly application."""

from flask import Flask, request, redirect, render_template, flash
from models import db, connect_db, User, Post, Tag
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = "as24ejx9D12n!adsSDN028D"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

@app.route("/")
def home_page():
  """Redirects to list of users"""
  posts = Post.query.order_by(Post.updated_at.desc()).limit(5).all()
  return render_template("homepage.html", posts=posts)

########################### USERS Section ###########################

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

########################### POSTS Section ###########################

@app.route("/posts/<int:post_id>")
def show_post(post_id):
  """Shows single post"""

  post = Post.query.get_or_404(post_id)
  return render_template("post.html", post=post)

@app.route("/posts/<int:post_id>/edit")
def show_edit_post_page(post_id):
  """Shows post edit page"""

  post = Post.query.get_or_404(post_id)
  tags = Tag.query.all()
  return render_template("edit_post.html", post=post, tags=tags)

@app.route("/posts/<int:post_id>/edit", methods=["POST"])
def edit_post(post_id):
  """Edits a post"""

  post = Post.query.get_or_404(post_id)

  post.tags.clear()
  for key in request.form:
    if key.startswith('tag_'):
      if request.form[key] == 'on':
        tagId = int(key[4:])
        tag = Tag.query.filter_by(id=tagId).first_or_404()
        post.tags.append(tag)

  post.title = request.form['title']
  post.content = request.form['content']

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
  tags = Tag.query.all()
  return render_template("new_post.html", user=user, tags=tags)

@app.route("/users/<int:user_id>/posts/new", methods=["POST"])
def add_new_post_post(user_id):
  """Adds a new post for specified user"""
  title = request.form['title']
  content = request.form['content']
  post = Post(title=title, content=content, user_id=user_id)
  for key in request.form:
    if key.startswith('tag_'):
      if request.form[key] == 'on':
        tagId = int(key[4:])
        tag = Tag.query.filter_by(id=tagId).first_or_404()
        post.tags.append(tag)

  db.session.add(post)
  db.session.commit()

  return redirect(f"/users/{user_id}")

########################### TAGS Section ###########################

@app.route("/tags")
def list_tags():
  """Shows all tags"""
  tags = Tag.query.all()
  return render_template("tag_list.html", tags=tags)

@app.route("/tags/<int:tag_id>")
def list_single_tag(tag_id):
  """Get a single tag and its related posts"""
  tag = Tag.query.get_or_404(tag_id)
  return render_template("single_tag.html", tag=tag)

@app.route("/tags/<int:tag_id>/edit")
def show_edit_tag(tag_id):
  """Shows the edit page for a tag."""

  tag = Tag.query.get_or_404(tag_id)
  return render_template("edit_tag.html", tag=tag)

@app.route("/tags/<int:tag_id>/edit", methods=["POST"])
def edit_tag(tag_id):
  """Sends a post request to edit a tag."""

  tag = Tag.query.get_or_404(tag_id)

  name = request.form['name']

  tag.name = name
  db.session.commit()

  return redirect("/tags")

@app.route("/tags/new")
def show_add_tag():
  """Show page for adding a new tag"""
  return render_template("new_tag.html")

@app.route("/tags/new", methods=["POST"])
def add_tag():
  """Handles adding a new tag"""
  name = request.form['name']

  existing_tag = bool(Tag.query.filter_by(name=name).first())
  if existing_tag:
    flash("Tag already exists. Tags must be unique.")
    return redirect("/tags/new")
  
  tag = Tag(name=name)

  db.session.add(tag)
  db.session.commit()

  return redirect(f"/tags")


if os.environ.get("TESTING") is None:
  connect_db(app)
