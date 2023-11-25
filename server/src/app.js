const express = require('express');
const app = express();
const createError = require('http-errors');

require('./configs/mongoose.config');
require('./configs/redis.config');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Init route
app.use('', require('./routes'));

app.use((req, res, next) => {
  next(createError.NotFound('This route is not exist!'));
});

app.use((err, req, res, next) => {
  console.log('err', err);
  return res.json({
    status: err.status || 500,
    message: err.message,
  });
});

module.exports = app;
