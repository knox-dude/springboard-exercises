from boggle import Boggle
from flask import Flask, request, render_template, jsonify, redirect, flash, session

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"

boggle_game = Boggle()

@app.route("/")
def landing_page():
  board = boggle_game.make_board()
  session["board"] = board

  return render_template("board.html", board=board)

@app.route("/check-guess")
def check_guess():
  """check if user's guess is in dictionary of words"""

  guess = request.args["guess"]
  board = session["board"]

  result = boggle_game.check_valid_word(board, guess)
  return jsonify({"result": result})
