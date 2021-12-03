var express = require('express');
var app = express();

var indexRouter = require('./index');
var usersRouter = require('./users');
var subjectRouter = require('./subject');

function routes(app) {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/subject', subjectRouter);
};

module.exports = routes;