"""Pet Adoption website"""

from flask import Flask, request, redirect, render_template, flash
from models import db, connect_db, Pet
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = "as24ejx9D12n!adsSDN028D"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_adoption'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

@app.route("/")
def home_page():
  """Shows list of pets"""
  pets = Pet.query.order_by(Pet.available.desc()).all()
  return render_template("homepage.html", pets=pets)



if os.environ.get("TESTING") is None:
  connect_db(app)
