"""User Authentication application."""

from flask import Flask, redirect, render_template, flash, session
from models import db, connect_db, User
from forms import RegisterForm, LoginForm
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
  form = RegisterForm()
  if form.validate_on_submit():
    username = form.username.data
    password = form.password.data
    new_user = User.register(username, password)

    email = form.email.data
    first_name = form.first_name.data
    last_name = form.last_name.data

    new_user.first_name = first_name
    new_user.last_name = last_name
    new_user.email = email

    db.session.add(new_user)
    db.session.commit()
    session["username"] = new_user.username
    flash("Welcome! Successfully created your account!")
    return redirect(f"/user/{session['username']}")

  return render_template("register.html", form=form)

@app.route("/login", methods=["GET", "POST"])
def login():
  form = LoginForm()
  if form.validate_on_submit():
    username = form.username.data
    password = form.password.data

    user = User.authenticate(username, password)
    if user:
      flash("Welcome back!")
      session['username'] = user.username
      return redirect(f"/users/{user.username}")
    else:
      form.username.errors = ['Invalid username/password.']

  return render_template("login.html", form=form)

@app.route("/logout")
def logout_user():
  session.pop('username')
  flash("Goodbye!", "info")
  return redirect('/')

@app.route("/users/<string:username>")
def get_user(username):
  if "username" not in session:
    flash("Please login first!")
    return redirect("/login")
  if session["username"] != username:
    redirect(f"/users/{session['username']}")
  user = User.query.get_or_404(session["username"])
  return render_template("user.html", user=user)

if os.environ.get("TESTING") is None:
  connect_db(app)