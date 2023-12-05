from models import db, Pet
from app import app

# Create all tables
with app.app_context():
  # If tables aren't empty, empty them
  db.drop_all()
  db.create_all()

  # Add pets
  woofy = Pet(name="woofy", species="dog", age=5, notes="Likes to woof.", available=True, photo_url="https://img.freepik.com/free-photo/isolated-happy-smiling-dog-white-background-portrait-4_1562-693.jpg")
  chirpie = Pet(name="chirpie", species="parrot", age=13, notes="Can repeat what you say!", available=False, photo_url="https://thumbs.dreamstime.com/b/parrot-close-up-shot-portrait-60275983.jpg")
  perry = Pet(name="perry", species="platypus", age=9, notes="Totally not a secret agent", available=True, photo_url="https://i.redd.it/g60q6rd4pjp41.jpg")
  
  db.session.add(woofy)
  db.session.add(chirpie)
  db.session.add(perry)

  db.session.commit()