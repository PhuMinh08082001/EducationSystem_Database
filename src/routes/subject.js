var express = require('express');
const subjectServices = require('../app/services/subjectServices');

var manageSubjectServices = require('../app/services/manageSubjectServices');
var router = express.Router();


router.get('/', function(req, res, next) {

    subjectServices.getAllSubject().then(async(rows) => {
        if (req.query.semester) {
            semester = req.query.semester;
        } else {
            semester = rows[0].semester;
        }
        subjectServices.getAllSemester(semester).then(async(semesters) => {
            try {

                res.render(`subject/manageSubject`, {
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
});



router.get('/edit/:id', function(req, res, next) {
    let id = req.params.id;
    subjectServices.getSubjectById(id).then(async(rows) => {

        try {
            res.render('subject/detailSub', { user: req.user, rows: rows });
        } catch (err) {
            console.log(err);
        }

    });
});

router.post('/edit', function(req, res, next) {
    let subject = {
        subjectID: req.body.subjectID,
        subjectName: req.body.subjectName,
        facultyID: req.body.facultyID,
        numOfCredits: req.body.numOfCredits,
        semester: req.body.semester,
    }
    subjectServices.updateSubject(subject.subjectName, subject.facultyID, subject.numOfCredits, subject.semester, subject.subjectID)
        .then(async(rows) => {
            try {
                res.redirect('/subject')
            } catch (err) {
                console.log(err);
            }
        })
})

router.get('/delete/:id', function(req, res, next) {
    let id = req.params.id;
    subjectServices.deleteById(id).then(async(rows) => {
        try {
            res.redirect('/subject')
        } catch (err) {
            console.log(err);
        }
    })
});


router.get('/add', function(req, res) {
    manageSubjectServices.getFacultyID().then(async(rows) => {
        manageSubjectServices.getSemester().then(async(results) => {
            try {

                res.render('subject/formAdd', { user: req.user, rows: rows, semesters: results });
            } catch (err) {
                console.log(err);
            }

        })
    })

})
router.post('/add', function(req, res) {
    let subject = {
        subjectID: req.body.subjectID,
        subjectName: req.body.subjectName,
        facultyID: req.body.facultyID,
        numOfCredits: req.body.numOfCredits,
        semester: req.body.semester,
    }

    subjectServices.addSubject(subject.subjectID, subject.subjectName, subject.facultyID, subject.numOfCredits, subject.semester)
        .then(async(rows) => {
            try {
                res.redirect('/subject')
            } catch (err) {
                console.log(err);
            }
        })

})
module.exports = router;