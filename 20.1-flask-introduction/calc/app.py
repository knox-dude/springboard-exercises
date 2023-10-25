# Put your app in here.
from flask import Flask, request
import operations

app = Flask(__name__)

ops = {"add":operations.add,
       "sub":operations.sub,
       "mult":operations.mult,
       "div":operations.div}

@app.route('/<operation>')
def operate(operation):
  a = int(request.args.get("a"))
  b = int(request.args.get("b"))
  result = ops[operation](a, b)
  return str(result)

@app.route('/math/<operation>')
def operate2(operation):
  a = int(request.args.get("a"))
  b = int(request.args.get("b"))
  result = ops[operation](a, b)
  return str(result)