var express = require('express');
var router = express.Router();

var managePointServices = require('../app/services/managePointServices');
var subjectServices = require('../app/services/subjectServices');

router.get('/viewSubject', function(req, res, next) {
    let id = req.session.passport.user.id;


    var subjects;
    var semesters;
    var semesters;

    async function getSubject() {
        await managePointServices.getSubject(id).then(async(rows) => {
            try {
                subjects = rows;
            } catch (err) {
                console.log(err);
            }
        });
        await
        managePointServices.getSemestersStudent(id).then(async(rows) => {
            try {
                if (req.query.semester) {
                    semester = req.query.semester;
                } else {
                    semester = rows[0].semester;
                }
                semesters = rows;
            } catch (err) {
                console.log(err);
            }
        })
        res.render('student/viewSubject', { user: req.user, rows: subjects, semesters: semesters, semester: semester });
    }

    getSubject();



});

router.get('/regisSub', (req, res) => {

})


module.exports = router;