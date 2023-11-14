from unittest import TestCase
from app import app
from models import db, User

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True
with app.app_context():
    db.drop_all()
    db.create_all()

class UserViewsTestCase(TestCase):
    """Tests for views for Users."""

    def setUp(self):
        """Add sample pet."""
        with app.app_context():
            User.query.delete()

            user = User(first_name="TestUser", last_name="Smith")
            user2 = User(first_name="UserToDelete", last_name="Hernandez")
            db.session.add(user)
            db.session.add(user2)
            db.session.commit()

            self.user_id = user.id
            self.user_id2 = user2.id
            self.user = user
            self.user2 = user2

    def tearDown(self):
        """Clean up any fouled transaction."""
        with app.app_context():
            db.session.rollback()

    def test_list_users(self):
        """Testing all users list page"""
        with app.test_client() as client:
            resp = client.get("/", follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('TestUser', html)

    def test_show_user(self):
        """Tests a single user's info page"""
        with app.test_client() as client:
            resp = client.get(f"/users/{self.user_id}")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>TestUser Smith</h1>', html)
            self.assertIn(self.user.image_url, html)
            

    def test_add_user(self):
        """Testing adding a user"""
        with app.test_client() as client:
            d = {"first_name": "TestUser2", "last_name": "Potter", "image_url":""}
            resp = client.post("/users/new", data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("TestUser2 Potter</a>", html)
    
    def test_delete_user(self):
        """Testing deleting a user"""
        with app.test_client() as client:
            resp = client.post(f"/users/{self.user_id2}/delete", follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertNotIn("UserToDelete", html)
