require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { NODE_ENV } = require('../config');
const validator = require('./validator');
const serverError = require('./serverError');
const moviesRouter = require('./moviesRouter');

const app = express();
app.use(helmet());
app.use(cors());
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';
app.use(morgan(morganOption));

app.use(serverError, validator, moviesRouter);

module.exports = app;