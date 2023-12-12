from models import db, User
from app import app

# Create all tables
with app.app_context():
  # If tables aren't empty, empty them
  db.drop_all()
  db.create_all()