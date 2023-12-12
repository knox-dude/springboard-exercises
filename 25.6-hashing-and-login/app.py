"""User Authentication application."""

from flask import Flask, request, redirect, render_template, flash
from models import db, connect_db, User
from forms import UserForm
from secret import SECRET_KEY
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///user_authentication'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

@app.route("/")
def home_page():
  """Redirects to /register"""
  return redirect("/register")

@app.route("/register", methods=["GET", "POST"])
def register():
  form = UserForm()
  if form.validate_on_submit():
    username = form.username.data
    password = form.password.data
    new_user = User.register(username, password)

    db.session.add(new_user)
    db.session.commit()
    flash("Welcome! Successfully created your account!")
    return redirect("/secret")

  return render_template("register.html", form=form)

@app.route("/login", methods=["GET", "POST"])
def login():
  form = UserForm()
  if form.validate_on_submit():
    username = form.username.data
    password = form.password.data

    user = User.authenticate(username, password)
    if user:
      return redirect("/secret")
    else:
      form.username.errors = ['Invalid username/password.']

  return render_template("login.html", form=form)

@app.route("/secret")
def secret_page():
  flash("You made it!")
  return redirect("base.html")

if os.environ.get("TESTING") is None:
  connect_db(app)