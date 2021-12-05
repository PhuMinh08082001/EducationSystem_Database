var express = require('express');
var router = express.Router();

var pdtServices = require('../app/services/pdtServices')
var subjectServices = require('../app/services/subjectServices')
var managePointServices = require('../app/services/managePointServices')
router.get('/viewSubject', function(req, res, next) {


    var listSubjects;
    var semesters;
    var semesters;

    async function getSubject() {
        await pdtServices.viewSubject().then(async(rows) => {
            try {
                listSubjects = rows;
            } catch (err) {
                console.log(err);
            }
        });
        await
        pdtServices.getSemesters().then(async(rows) => {
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
        res.render('pdt/viewSubject', { user: req.user, listSubjects: listSubjects, semesters: semesters, semester: semester });
    }
    getSubject();
});


router.get('/viewSubject/:name', function(req, res) {
    var name = req.params.name;
    var semester = req.query.semester;
    managePointServices.getListClass(name, semester).then(async function(rows) {
        res.render('pdt/viewClass', { user: req.user, rows: rows , semester: semester})
    })


})

module.exports = router;