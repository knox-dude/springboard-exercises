from boggle import Boggle
import pdb
from flask import Flask, request, render_template, jsonify, redirect, flash, session

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"

boggle_game = Boggle()

@app.route("/")
def landing_page():
  """Shows the landing page with board loaded in"""
  board = boggle_game.make_board()
  session["board"] = board
  score = session.get("highscore", 0)
  nplays = session.get("nplays", 0)

  return render_template("board.html", board=board, highscore=score, nplays=nplays)

@app.route("/check-guess")
def check_guess():
  """check if user's guess is in dictionary of words"""

  guess = request.args["guess"]
  board = session["board"]

  result = boggle_game.check_valid_word(board, guess)
  return jsonify({"result": result})

@app.route("/post-score", methods=["POST"])
def post_score():
  """Saves users high score and number of games"""
  score = request.json["score"]
  highscore = session.get("highscore", 0)
  nplays = session.get("nplays", 0)

  session['nplays'] = nplays + 1
  newRecord = True if score > highscore else False

  session['highscore'] = max(score, highscore)
  return jsonify({"newRecord":newRecord, "nplays":nplays+1})
