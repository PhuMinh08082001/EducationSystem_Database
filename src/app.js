if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const Handlebars = require('handlebars')
const handlebars = require('express-handlebars');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');


var passport = require('passport');
var session = require('express-session');


var routes = require('./routes/app');
var app = express();


var handlerbar = require('./app/handlebarhelp/handlebarhelps');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.engine('.hbs', handlebars({ layoutsDir: __dirname + '/views/layouts', extname: '.hbs' }));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SECERT_SESSION_KEY,
    resave: true,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
    app.locals.success = req.flash('success')
    app.locals.error = req.flash('error')
    app.locals.errors = req.flash('errors')
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});

routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;