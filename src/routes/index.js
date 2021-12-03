var express = require('express');
var router = express.Router();

var loginController = require('../app/controller/loginController')

var passport = require('passport');
var initPassportLocal = require('../app/controller/passport');
/* GET home page. */

initPassportLocal();

router.get('/', function(req, res, next) {

    res.render('index', { title: 'Express', user: req.user });
});

// router.get('/signup', function(req, res, next) {
//     res.render('signup/option', { layout: 'index' });
// });

router.get('/signup', loginController.checkLoggedOut, loginController.getPageLogin);

router.get('/login/:role', function(req, res, next) {
    res.render('signup/form', { role: req.params.role });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    successFlash: true,
    failureFlash: true
}));

router.post("/logout", loginController.postLogOut);

module.exports = router;