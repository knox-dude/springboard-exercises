from flask import Flask, request, render_template, redirect, flash
from surveys import satisfaction_survey

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"

survey_answers = []

@app.route("/")
def home_page_survey():
  """Make the home page using Survey object"""

  return render_template("survey_start.html", survey=satisfaction_survey)

@app.route("/questions/<int:number>")
def show_question(number):
  """Shows the survey question"""

  if (len(survey_answers) != number):
    flash("Invalid question number")
    return redirect(f"/questions/{len(survey_answers)}")

  question = satisfaction_survey.questions[number]

  return render_template("survey_question.html", question=question, number=number)

@app.route('/answer', methods=["POST"])
def add_answer():
  """Adds answer to database (list of survey questions)"""

  if len(survey_answers) == len(satisfaction_survey.questions):
    redirect("/finished")

  answer = request.form['answer']
  survey_answers.append(answer)
  
  return redirect(f"/questions/{len(survey_answers)}")
  

@app.route('/finished')
def finish_survey():
  return render_template("final_page.html")