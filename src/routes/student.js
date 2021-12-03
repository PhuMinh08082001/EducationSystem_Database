var express = require('express');
var router = express.Router();

var managePointServices = require('../app/services/managePointServices')
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

})


module.exports = router;