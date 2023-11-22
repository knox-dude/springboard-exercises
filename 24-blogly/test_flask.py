import os
os.environ["TESTING"] = "TRUE"

from unittest import TestCase
from app import app
from models import db, User, Post, connect_db


# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

connect_db(app)

with app.app_context():
    db.drop_all()
    db.create_all()

class UserViewsTestCase(TestCase):
    """Tests for views for Users."""

    def setUp(self):
        with app.app_context():
            db.create_all()

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
            db.drop_all()

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
            self.assertIn('<h2>TestUser Smith</h2>', html)
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

class PostViewsTestCase(TestCase):
    """Tests for views for Users."""

    def setUp(self):
        with app.app_context():
            db.create_all()

            user = User(first_name="TestUser", last_name="Smith")
            user2 = User(first_name="UserToDelete", last_name="Hernandez")

            db.session.add(user)
            db.session.add(user2)
            db.session.commit()
            self.user_id, self.user2_id = user.id, user2.id
            self.user_first_name, self.user_last_name = user.first_name, user.last_name
        
            post = Post(title="TestPost1",
                        content="Here's the content for the test post.",
                        user_id=self.user_id)
            post2 = Post(title="PostTodelete",
                        content="This post gon' die.",
                        user_id=self.user2_id)

            db.session.add(post)
            db.session.add(post2)
            db.session.commit()

            self.post_id, self.post2_id = post.id, post2.id
            self.post_title = post.title

    def tearDown(self):
        """Clean up any fouled transaction."""
        with app.app_context():
            db.session.rollback()
            db.drop_all()


    def test_user_post_detail(self):
        """Testing individual user page for posts"""
        with app.test_client() as client:
            resp = client.get(f"/users/{self.user_id}")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h2>Posts</h2>', html)
            self.assertIn(f'{self.post_title}</a>', html)

    def test_show_post(self):
        """Tests a single user's info page"""
        with app.test_client() as client:
            resp = client.get(f"posts/{self.post_id}")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h2>TestPost1</h2>', html)
            self.assertIn(self.user_first_name, html)
            self.assertIn(self.user_last_name, html)
            

    def test_add_post(self):
        """Testing adding a user"""
        with app.test_client() as client:
            d = {"title": "TestPost3", "content": "I am the third and final to be born."}
            resp = client.post(f"/users/{self.user_id}/posts/new", data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('TestPost3</a>', html)
    
    def test_delete_post(self):
        """Testing deleting a user"""
        with app.test_client() as client:
            resp = client.post(f"/posts/{self.post2_id}/delete", follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertNotIn("PostTodelete", html)
            self.assertIn("Posts", html)