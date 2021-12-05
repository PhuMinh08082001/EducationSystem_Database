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
    let id = req.session.passport.user.id;
    subjectServices.getAllSubject().then(async(rows) => {
        if (req.query.semester) {
            semester = req.query.semester;
        } else {
            semester = rows[0].semester;
        }
        for (let i = 0; i < rows.length; i++) {
            managePointServices.checkExist(rows[i].subjectID, id, rows[i].semester).then(async(rows2) => {
                if (rows2.length > 0) Object.assign(rows[i], { existed: "1" });
                else Object.assign(rows[i], { existed: "0" });
            })
            managePointServices.checkExistLecturer(rows[i].subjectID, rows[i].semester).then(async(rows3) => {
                if (rows3.length == 0) rows[i].existed = "2";
                console.log(rows[i].existed)
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