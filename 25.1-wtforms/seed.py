from models import db, Pet
from app import app

# Create all tables
with app.app_context():
  # If tables aren't empty, empty them
  db.drop_all()
  db.create_all()

  # Add pets
  woofy = Pet(name="Woofy", species="dog", age=5, notes="Likes to woof.", available=True, photo_url="https://img.freepik.com/free-photo/isolated-happy-smiling-dog-white-background-portrait-4_1562-693.jpg")
  chirpie = Pet(name="Chirpie", species="parrot", age=13, notes="Can repeat what you say!", available=False, photo_url="https://thumbs.dreamstime.com/b/parrot-close-up-shot-portrait-60275983.jpg")
  perry = Pet(name="Perry", species="platypus", age=9, notes="Totally not a secret agent", available=True, photo_url="https://i.redd.it/g60q6rd4pjp41.jpg")
  joey = Pet(name="Joey", species="kangaroo", age=1, notes="Packs a mean kick!", available=False, photo_url="https://media.istockphoto.com/id/641171366/photo/red-kangaroo-on-white.jpg?s=612x612&w=0&k=20&c=G51ZPwGv6COD0uIJTmI21jzQa4O-bn3J1fN6Dh_hipg=")
  db.session.add(woofy)
  db.session.add(chirpie)
  db.session.add(perry)
  db.session.add(joey)

  db.session.commit()