var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var loginService = require('../services/loginService')
    // Init all passport


let initPassportLocal = () => {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'email',
            passReqToCallback: true
        },
        async(req, email, password, done) => {
            try {

                let role = req.body.role;
                if (role == 'sv') {
                    await loginService.findStudentById(email).then(async(user) => {

                        if (!user) {
                            return done(null, false, req.flash("errors", `This user email "${id}" doesn't exist`));
                        }
                        if (user) {
                            user['role'] = role;

                            return done(null, user, null)
                        }
                    });
                } else if (role == 'gv') {
                    await loginService.findLecturerById(email).then(async(user) => {
                        if (!user) {
                            return done(null, false, req.flash("errors", `This user email "${id}" doesn't exist`));
                        }
                        if (user) {
                            user['role'] = role;
                            console.log(user);
                            return done(null, user, null)
                        }
                    });
                } else if (role == 'ql') {
                    let user = { fullName: 'Khoa Quan Li', role: role }
                    return done(null, user, null)

                } else if (role == 'pdt') {
                    let user = { fullName: 'Phong Dao Tao', role: role }
                    return done(null, user, null)
                }
            } catch (err) {
                console.log(err);
                return done(null, false, { message: err });
            }
        }));

};

passport.serializeUser((user, done) => {
    let temp = { id: 1, role: user.role, fullName: 'null' };

    if (user.studentID) {
        temp.id = user.studentID;
    } else if (user.lecturerID) {
        temp.id = user.lecturerID;
    } else {
        temp.fullName = user.fullName
    }
    done(null, temp);

});

passport.deserializeUser((temp, done) => {
    if (temp.role == 'sv') {
        loginService.findStudentById(temp.id).then((user) => {
            return done(null, user);
        }).catch(error => {
            return done(error, null)
        });
    } else if (temp.role == 'gv') {
        loginService.findLecturerById(temp.id).then((user) => {
            return done(null, user);
        }).catch(error => {
            return done(error, null)
        });
    } else {
        return done(null, temp);
    }
});

module.exports = initPassportLocal;