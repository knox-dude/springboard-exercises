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

@app.route("/users/new", methods=["POST"])
def add_user():
  """Add user and redirect to list."""

  first_name = request.form['first_name']
  last_name = request.form['last_name']
  image_url = request.form['image_url']

  user = User(first_name=first_name, last_name=last_name, image_url=image_url)
  db.session.add(user)
  db.session.commit()

  return redirect("/users")

@app.route("/users")
def list_users():
  """List users and show link to add form."""
  users = User.query.all()
  return render_template("list.html", users=users)