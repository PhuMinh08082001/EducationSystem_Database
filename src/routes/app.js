var express = require('express');
var app = express();

var indexRouter = require('./index');
var usersRouter = require('./users');
var subjectRouter = require('./subject');
var studentRouter = require('./student');
var lecturerRouter = require('./lecturer')

function routes(app) {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/subject', subjectRouter);
    app.use('/student', studentRouter);
    app.use('/lecturer', lecturerRouter);
};

module.exports = routes;