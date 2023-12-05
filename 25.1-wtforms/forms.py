"""Forms for our demo Flask app."""

from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, BooleanField, TextAreaField
from wtforms.validators import InputRequired, URL, Optional, NumberRange
#from wtforms.validators import Email, 


class AddPetForm(FlaskForm):
  """Form for adding pets."""

  name = StringField("Pet Name",
                      validators=[InputRequired(message="Pet Name can't be blank")])
  species = SelectField("Species",
                        choices=["cat", "dog", "porcupine"],
                        validators=[InputRequired()])
  age = IntegerField("Age",
                     validators=[Optional(), NumberRange(0, 30)])
  notes = StringField("Notes")
  photo_url = StringField("Photo URL",
                          validators=[Optional(), URL(message="Must be a valid URL")])
  
class EditPetForm(FlaskForm):
  """Form for editing pets."""

  photo_url = StringField("Photo URL",
                          validators=[Optional(), URL(message="Must be a valid URL")])
  available = BooleanField("Available for Adoption")
  notes = TextAreaField("Pet Notes")


# class UserForm(FlaskForm):
#     """Form for adding/editing friend."""

#     name = StringField("Name",
#                        validators=[InputRequired()])
#     email = StringField("Email Address",
#                         validators=[Optional(), Email()])

# class AddSnackForm(FlaskForm):
#     email = StringField("Email", validators=[Optional(), Email()])
#     name = StringField("Snack Name",  validators=[
#                        InputRequired(message="Snack Name can't be blank")])
#     price = FloatField("Price in USD")
#     quantity = IntegerField("How many?")
#     is_healthy = BooleanField("This is a healthy snack")

#     # category = RadioField("Category", choices=[
#     #                       ('ic', 'Ice Cream'),  ('chips', 'Potato Chips'),  ('candy', 'Candy/Sweets')])
#     category = SelectField("Category", choices=[
#                           ('ic', 'Ice Cream'),  ('chips', 'Potato Chips'),  ('candy', 'Candy/Sweets')])


# class EmployeeForm(FlaskForm):
#     name = StringField("Employee Name", validators=[
#                        InputRequired(message="Name cannot be blank")])
#     state = SelectField('State', choices=[(st, st) for st in states])
#     dept_code = SelectField("Department Code")

