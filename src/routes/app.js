var express = require('express');
var app = express();

var indexRouter = require('./index');
var usersRouter = require('./users');
var subjectRouter = require('./subject');
var studentRouter = require('./student');
var lecturerRouter = require('./lecturer')
var pdtRouter = require('./pdt');

function routes(app) {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/subject', subjectRouter);
    app.use('/student', studentRouter);
    app.use('/lecturer', lecturerRouter);
    app.use('/pdt', pdtRouter);
};

module.exports = routes;