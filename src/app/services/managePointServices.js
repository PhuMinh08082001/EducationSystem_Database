var connection = require('../../config/db');

let getSubject = (id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                'SELECT * FROM managepoint, subject WHERE managepoint.subjectID = subject.subjectID AND managepoint.studentID = ? AND managepoint.semester = ?', [id, 211],
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
let insertNewRegister = (subjectID, studentID, semester) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                'INSERT INTO register (subjectID, studentID, semester) VALUES (?, ?, ?)', [subjectID, studentID, semester],
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
let checkExist = (subjectID, studentID, semester) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                'SELECT * FROM register WHERE(subjectID = ? AND studentID = ? AND semester = ?)', [subjectID, studentID, semester],
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
    getSubject: getSubject,
    insertNewRegister: insertNewRegister,
    checkExist: checkExist
};