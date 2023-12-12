# from flask_wtf import FlaskForm
# from wtforms import StringField, SelectField, IntegerField, BooleanField, TextAreaField
# from wtforms.validators import InputRequired, URL, Optional, NumberRange

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Length


class RegisterForm(FlaskForm):
  username = StringField("Username", validators=[InputRequired(), Length(1, 20)])
  password = PasswordField("Password", validators=[InputRequired()])
  email = StringField("Email:", validators=[InputRequired(), Length(max=50)])
  first_name = StringField("First Name:", validators=[InputRequired(), Length(1, 30)])
  last_name = StringField("Last Name:", validators=[InputRequired(), Length(1, 30)])

class LoginForm(FlaskForm):
  username = StringField("Username", validators=[InputRequired(), Length(1, 20)])
  password = PasswordField("Password", validators=[InputRequired()])


class TweetForm(FlaskForm):
  text = StringField("Tweet Text", validators=[InputRequired()])
