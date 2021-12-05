var express = require('express');
var router = express.Router();
var managePointServices = require('../app/services/managePointServices');
var subjectServices = require('../app/services/subjectServices');
var manageSubjectServices = require('../app/services/manageSubjectServices');


router.get('/viewClass', (req, res) => {
    let id = req.session.passport.user.id;
    manageSubjectServices.getAllTeachingClass(id).then(async(rows) => {
        if (req.query.semester) {
            semester = req.query.semester;
        } else {
            semester = rows[0].semester;
        }
        for (let i = 0; i < rows.length; i++) {
            manageSubjectServices.getAllStdOfClass(rows[i].subjectID, rows[i].className, rows[i].semester).then(async(rows2) => {
                Object.assign(rows[i], { classCount: rows2.length });
            })
        }
        subjectServices.getAllSemester(semester).then(async(semesters) => {
            try {
                res.render(`lecturer/viewAllClass`, {
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
router.get('/viewClass/detail/:className/:subjectID/:semester', (req, res) => {
    let subjectID = req.params.subjectID;
    let className = req.params.className;
    let semester = req.params.semester;
    let id = req.session.passport.user.id;

    manageSubjectServices.getAllStdOfClass(subjectID, className, semester).then(async(rows) => {
        try {
            console.log(rows)
            res.render(`lecturer/detailClass`, {
                user: req.user,
                rows: rows,
                semeste: semester,
                _className: className
            });
        } catch (err) {
            console.log(err);
        }
    });
})

module.exports = router;