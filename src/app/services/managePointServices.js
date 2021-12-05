var connection = require('../../config/db');

let getSubject = (id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                'select mana.subjectID, sub.subjectName from managepoint as mana join subject as sub on sub.subjectID = mana.subjectID where mana.studentId = ? ', [id],
                function(err, rows) {
                    console.log(this.sql)
                    if (err) {
                        reject(err)
                    }
                    resolve(rows);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
}

let getSemestersStudent = (id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                ' SELECT distinct semester FROM managePoint where studentID = ? order by semester DESC ', id,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    resolve(rows);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    getSubject: getSubject,
    getSemestersStudent: getSemestersStudent,

};