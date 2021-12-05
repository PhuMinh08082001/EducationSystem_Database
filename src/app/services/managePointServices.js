var connection = require('../../config/db');

let getSubject = (id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                'select mana.subjectID, sub.subjectName, mana.semester from managepoint as mana join subject as sub on sub.subjectID = mana.subjectID where mana.studentId = ? ', [id],
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
let checkExistLecturer = (subjectID, semester) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                'SELECT * FROM teach WHERE(subjectID = ? AND semester = ?)', [subjectID, semester],
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


let getListClass = (name, semester) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                'select distinct subjectID, className from class where subjectID = ? and semester = ?', [name, semester],
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
module.exports = {
    getSubject: getSubject,
    insertNewRegister: insertNewRegister,
    checkExist: checkExist,
    getSemestersStudent: getSemestersStudent,
    checkExistLecturer: checkExistLecturer,
    getListClass: getListClass,
};