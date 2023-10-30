from flask import Flask, request, render_template, redirect, flash, session
from surveys import satisfaction_survey

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"

@app.route("/")
def landing_page():
  """Make the home page using Survey object"""

  return render_template("survey_start.html", survey=satisfaction_survey)

@app.route("/start", methods=["POST"])
def start_survey():
  """Clear the responses cache"""

  session["responses"] = []

  return redirect("/questions/0")

@app.route("/questions/<int:number>")
def show_question(number):
  """Shows the survey question"""
  responses = session["responses"]

  if (len(responses) != number):
    flash("Invalid question number")
    return redirect(f"/questions/{len(responses)}")

  question = satisfaction_survey.questions[number]

  return render_template("survey_question.html", question=question, number=number)

@app.route('/answer', methods=["POST"])
def add_answer():
  """Adds answer to database (list of survey questions)"""
  responses = session["responses"]

  if len(responses) == len(satisfaction_survey.questions)-1:
    return redirect("/finished")

  answer = request.form['answer']
  responses.append(answer)
  session["responses"] = responses
  
  return redirect(f"/questions/{len(responses)}")
  

@app.route('/finished')
def finish_survey():
  return render_template("final_page.html")