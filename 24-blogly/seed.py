from models import User, db
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
User.query.delete()

# Add users
jim_bean = User(first_name="Jim",last_name="Bean")
miranda_cosgrove = User(first_name="Miranda", last_name="Cosgrove")
barack_obama = User(first_name="Barack", last_name="Obama")

db.session.add(jim_bean)
db.session.add(miranda_cosgrove)
db.session.add(barack_obama)

db.session.commit()