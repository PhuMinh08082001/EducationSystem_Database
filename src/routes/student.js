var express = require('express');
var router = express.Router();

var managePointServices = require('../app/services/managePointServices')
const subjectServices = require('../app/services/subjectServices');

router.get('/viewSubject', function(req, res, next) {
    let id = req.session.passport.user.id;
    managePointServices.getSubject(id).then(async(rows) => {
        try {
            res.render('student/viewSubject', { user: req.user, rows: rows });
        } catch (err) {
            console.log(err);
        }
    })
});

router.get('/regisSub', (req, res) => {
    let id = req.session.passport.user.id;
    subjectServices.getAllSubject().then(async(rows) => {
        if (req.query.semester) {
            semester = req.query.semester;
        } else {
            semester = rows[0].semester;
        }
        for (let i = 0; i < rows.length; i++) {
            managePointServices.checkExist(rows[i].subjectID, id, rows[i].semester).then(async(rows2) => {
                console.log(rows2)
                if(rows2.length > 0) Object.assign(rows[i], {existed: "1"});
                else Object.assign(rows[i], {existed: "0"});
            })
        }
        subjectServices.getAllSemester(semester).then(async(semesters) => {
            try {
                res.render(`student/registerSubject`, {
                    user: req.user,
                    rows: rows,
                    semesters: semesters,
                    semeste: semester,
                });
            } catch (err) {
                console.log(err);
            }
        });
    });
})
router.get('/regisSub/enroll/:subID/:stuID/:semester', function(req, res, next) {
    let subjectID = req.params.subID;
    let studentID = req.params.stuID;
    let semester = req.params.semester;
    managePointServices.insertNewRegister(subjectID, studentID, semester).then(async(rows) => {
        try {
            res.redirect('/student/regisSub/?semester=' + semester)
        } catch (err) {
            console.log(err);
        }
    })
});


module.exports = router;