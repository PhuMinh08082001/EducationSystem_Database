var connection = require('../../config/db');

let viewSubject = () => {
    let sql = "SELECT distinct * FROM faculty AS F JOIN (SELECT R.subjectID,subjectName, R.semester, S.facultyID FROM school.register AS R, school.subject AS S WHERE R.subjectID = S.subjectID) AS X ON F.facultyID = X.facultyID;"
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                sql,
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
}


let getSemesters = () => {
    let sql = "SELECT distinct semester FROM faculty AS F JOIN (SELECT subjectName, R.semester, S.facultyID FROM school.register AS R, school.subject AS S WHERE R.subjectID = S.subjectID) AS X ON F.facultyID = X.facultyID;"
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                sql,
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
}

module.exports = {
    viewSubject: viewSubject,
    getSemesters: getSemesters,

};