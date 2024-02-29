const express = require('express');
const morgan = require('morgan');

const items = require('./fakeDb');

const app = express();

app.use(morgan('dev'));
app.use(express.json());