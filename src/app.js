const express = require('express');

const app = express();
const router = require('./routes/router');
const errorHandler = require('./middlewares/error');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', router);
app.use(errorHandler);

module.exports = app;
