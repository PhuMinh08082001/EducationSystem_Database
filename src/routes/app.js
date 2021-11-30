var express = require('express');
var app = express();

var indexRouter = require('./index');
var usersRouter = require('./users');

function routes(app) {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
};

module.exports = routes;