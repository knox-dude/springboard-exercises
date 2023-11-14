"""Blogly application."""

from flask import Flask, request, redirect, render_template
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

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
  return render_template("detail.html", user=user)

@app.route("/users/<int:user_id>/edit")
def show_edit_page(user_id):
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