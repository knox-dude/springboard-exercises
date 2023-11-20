from models import db, User, Post
from app import app

# Create all tables
with app.app_context():
  db.drop_all()
  db.create_all()

  # If tables aren't empty, empty them
  User.query.delete()
  Post.query.delete()

  # Add users
  jim_bean = User(first_name="Jim",last_name="Bean")
  miranda_cosgrove = User(first_name="Miranda", last_name="Cosgrove")
  barack_obama = User(first_name="Barack", last_name="Obama")

  db.session.add(jim_bean)
  db.session.add(miranda_cosgrove)
  db.session.add(barack_obama)

  db.session.commit()

  # Add posts
  jim_post = Post(title="The best whiskey!", 
                  content="Wow, I sure do love Jim Bean!",
                  user_id=User.query.filter_by(first_name='Jim').first().id)
  miranda_post = Post(title="My fav show!",
                      content="Have you seen this show called iMiranda?",
                      user_id=User.query.filter_by(first_name='Miranda').first().id)
  jim_post_2 = Post(title="The best floor detergent!",
                    content="What the hell is a floor detergent?",
                    user_id=User.query.filter_by(first_name='Jim').first().id)
  obama_post = Post(title="I was best prez.",
                    content="Hell yeah you know it, everyone knows it",
                    user_id=User.query.filter_by(first_name='Barack').first().id)

  db.session.add(jim_post)
  db.session.add(miranda_post)
  db.session.add(jim_post_2)
  db.session.add(obama_post)

  db.session.commit()