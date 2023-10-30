from boggle import Boggle
from flask import Flask, request, render_template, redirect, flash, session

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"

boggle_game = Boggle()

@app.route("/")
def landing_page():
  board = boggle_game.make_board()
  session["board"] = board

  return render_template("board.html", board=board)
