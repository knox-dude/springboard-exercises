"""Pet Adoption website"""

from flask import Flask, request, redirect, render_template, flash
from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm
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

@app.route('/add', methods=["GET", "POST"])
def add_pet():
    """Renders pet form (GET) or handles pet form submission (POST)"""
    form = AddPetForm()
    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        age = form.age.data
        notes = form.notes.data
        photo_url = form.photo_url.data
        if photo_url == "" or photo_url==None:
           photo_url = "https://static.thenounproject.com/png/574704-200.png"

        pet = Pet(name=name, species=species, age=age, notes=notes, photo_url=photo_url)
        db.session.add(pet)
        db.session.commit()
        flash(f"Created new Pet: {name} the {species}")
        return redirect('/')
    else:
        return render_template("add_pet_form.html", form=form)

@app.route('/<int:pet_id>', methods=["GET", "POST"])
def show_pet(pet_id):
  """Shows info on single pet (GET) or handles edit form submission (POST)"""
  pet = Pet.query.get_or_404(pet_id)
  form = EditPetForm(obj=pet)

  if form.validate_on_submit():
    pet.photo_url = form.photo_url.data
    pet.available = form.available.data
    pet.notes = form.notes.data

    db.session.commit()
    return redirect("/")
  else:
     return render_template("edit_and_view_pet.html", pet=pet, form=form)


if os.environ.get("TESTING") is None:
  connect_db(app)
