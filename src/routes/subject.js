var express = require('express');
const subjectServices = require('../app/services/subjectServices');

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
router.get('/detail/:subjectID/:semester', function(req, res, next) {
    let subjectID = req.params.subjectID;
    let semester = req.params.semester;
    subjectServices.getAllClassOfSub(subjectID, semester).then(async(rows) => {
        try {

            res.render(`subject/viewClassOfSub`, {
                user: req.user,
                rows: rows,
                semeste: semester,

            });
        } catch (err) {
            console.log(err);
        }
    })
});
router.get('/detail/edit/:subjectID/:semester/:className', function(req, res, next) {
    let subjectID = req.params.subjectID;
    let semester = req.params.semester;
    let className = req.params.className;
    subjectServices.getAllLecturerOfSubject(subjectID, semester).then(async(rows2) => {
        subjectServices.getAllWeekOfClass(subjectID, semester, className).then(async(rows) => {
            try {
                for (let i = 0; i < rows.length; i++) {
                    if(i == rows.length - 1) Object.assign(rows[i], { lastChild: "1" });
                    else Object.assign(rows[i], { lastChild: "0" });
                }
                
                res.render(`subject/viewWeekOfClass`, {
                    user: req.user,
                    rows: rows,
                    semeste: semester,
                    rows2: rows2
                });
            } catch (err) {
                console.log(err);
            }
        });
    })
});
router.get('/detail/add/:week/:semester/:className/:subjectID/:lecturerID', function(req, res, next) {
    let week = req.params.week;
    let semester = req.params.semester;
    let className = req.params.className;
    let subjectID = req.params.subjectID;
    let lecturerID = req.params.lecturerID;

    subjectServices.addNewWeekWithLec(week, semester, className, subjectID, lecturerID).then(async(rows) => {
        try {
            res.redirect('/subject/detail/edit/' + subjectID + '/' + semester +'/' + className)
        } catch (err) {
            console.log(err);
        }
    })
});
module.exports = router;