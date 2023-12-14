from models import db, User, Feedback
from app import app

# Create all tables
with app.app_context():
  # If tables aren't empty, empty them
  db.drop_all()
  db.create_all()