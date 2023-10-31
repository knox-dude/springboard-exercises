from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def setUp(self):
        """Run setups before each test"""
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_landing_page(self):
        """Make sure all the HTML we want is there, and session is correct"""
        with self.client:
            res = self.client.get("/")
            self.assertIn('board', session)
            self.assertIsNone(session.get('highscore'))
            self.assertIsNone(session.get('nplays'))
            self.assertIn(b'<p>High Score:', res.data)
            self.assertIn(b' Num Plays: ', res.data)
            self.assertIn(b'Your Score: ', res.data)
            self.assertIn(b'Time remaining:', res.data)

    def test_check_guess(self):
        with self.client as client:
            with client.session_transaction() as change_session:
                change_session["board"] = [
                    ["H","E","L","P","M"],
                    ["H","E","L","P","M"],
                    ["H","E","L","P","M"],
                    ["H","E","L","P","M"],
                    ["H","E","L","P","M"]
                ]
            res = self.client.get("/check-guess?guess=help")
            self.assertEqual(res.json['result'], 'ok')
            res = self.client.get("/check-guess?guess=mple")
            self.assertEqual(res.json["result"], "not-word")
            res = self.client.get("/check-guess?guess=able")
            self.assertEqual(res.json["result"], "not-on-board")
