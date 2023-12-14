"""User Authentication application."""

from flask import Flask, redirect, render_template, flash, session
from models import db, connect_db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm
from secret import SECRET_KEY
from werkzeug.exceptions import Unauthorized
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///user_authentication'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

def validate_user(username):
  """Ensures user is logged in and can't access other users"""
  if "username" not in session or username != session['username']:
    raise Unauthorized()

@app.route("/")
def home_page():
  """Redirects to /register"""
  if "username" in session:
    return redirect(f"/users/{session['username']}")
  else:
    return redirect("/register")

@app.route("/register", methods=["GET", "POST"])
def register():
  """Registers a new user and adds their info to the DB"""
  form = RegisterForm()
  if form.validate_on_submit():
    username = form.username.data
    user_exists = User.query.filter_by(username=username).first()
    if (user_exists):
      flash("Username taken!")
      redirect ("/register")

    password = form.password.data
    new_user = User.register(username, password)

    new_user.first_name = form.first_name.data
    new_user.last_name = form.last_name.data
    new_user.email = form.email.data

    db.session.add(new_user)
    db.session.commit()

    session["username"] = new_user.username
    flash("Welcome! Successfully created your account!")

    return redirect(f"/users/{session['username']}")

  return render_template("register.html", form=form)

@app.route("/login", methods=["GET", "POST"])
def login():
  """Logs in and authenticates user"""
  form = LoginForm()
  if form.validate_on_submit():
    username = form.username.data
    password = form.password.data

    user = User.authenticate(username, password)
    if user:
      session['username'] = user.username
      return redirect(f"/users/{user.username}")
    else:
      form.username.errors = ['Invalid username/password.']

  return render_template("login.html", form=form)

@app.route("/logout", methods=["POST"])
def logout_user():
  """Logs user out"""
  session.pop('username')
  flash("Goodbye!", "info")
  return redirect('/')

@app.route("/users/<string:username>")
def get_user(username):
  """Returns info on a user if logged in"""
  validate_user(username)
  user = User.query.get_or_404(session["username"])
  return render_template("user.html", user=user)

if os.environ.get("TESTING") is None:
  connect_db(app)

@app.route("/users/<string:username>/delete", methods=["POST"])
def delete_user(username):
  """Allows user to delete their profile if logged in"""
  validate_user(username)
  user = User.query.get_or_404(session["username"])
  db.session.delete(user)
  db.session.commit()
  session.pop("username")

  return redirect("/login")

@app.route("/users/<string:username>/feedback/add", methods=["GET", "POST"])
def add_feedback(username):
  """Shows add feedback form and handles addition to database"""
  validate_user(username)
  form = FeedbackForm()

  if form.validate_on_submit():
    title = form.title.data
    content = form.content.data
    feedback = Feedback(title=title, content=content, username=session["username"])
    db.session.add(feedback)
    db.session.commit()
    return redirect(f"/users/{session['username']}")
  
  return render_template("feedback.html", form=form)

@app.route("/feedback/<int:feedback_id>/update", methods=["GET", "POST"])
def update_feedback(feedback_id):
  """Shows edit feedback form and handles editing in database"""
  feedback = Feedback.query.get_or_404(feedback_id)
  username = feedback.username
  validate_user(username)
  form = FeedbackForm(obj=feedback)

  if form.validate_on_submit():
    feedback.title = form.title.data
    feedback.content = form.content.data
    db.session.add(feedback)
    db.session.commit()
    return redirect(f"/users/{username}")
  
  return render_template("feedback.html", form=form)


@app.route("/feedback/<int:feedback_id>/delete", methods=["POST"])
def delete_feedback(feedback_id):
  """Deletes a feedback after validating user"""
  feedback = Feedback.query.get_or_404(feedback_id)
  username = feedback.username
  validate_user(username)

  db.session.delete(feedback)
  db.session.commit()
  return redirect(f"/users/{username}")