from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from stories import story

app = Flask(__name__)

app.config['SECRET_KEY'] = "makingasupersecretkey"
debug = DebugToolbarExtension(app)

@app.route("/")
def home_page_inputs():
  """Make the home page with story prompts"""
  prompts = story.prompts

  return render_template("homePageQuestions.html", prompts=prompts)

@app.route("/story")
def show_story():
  story_answers = story.generate(request.args)
  return render_template("story.html", story_answers=story_answers)