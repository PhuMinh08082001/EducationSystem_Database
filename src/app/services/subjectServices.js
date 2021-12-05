var connection = require('../../config/db');


let addSubject = (id, name, faculty, num, semester) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                'INSERT INTO `subject` (`subjectID`, `subjectName`, `facultyID`, `numOfCredits`, `semester`) VALUES (?, ?, ?, ?, ?) ', [id, name, faculty, num, semester],
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
let getAllSubject = () => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                ' SELECT * FROM `subject` ',
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

let getSubjectById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                ' SELECT * FROM `subject` WHERE subjectID = ?', id,
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

let getAllSemester = () => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                ' SELECT distinct semester FROM `subject` order by semester DESC',
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

let updateSubject = (subjectName, facultyID, numOfCredits, semester, id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                'UPDATE  subject SET subjectName = ?, facultyID = ?,numOfCredits = ? , semester = ? WHERE subjectID = ?', [subjectName, facultyID, numOfCredits, semester, id],
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

let deleteById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                'DELETE FROM subject where subjectID = ?', [id],
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    resolve();
                }
            );
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    getAllSubject: getAllSubject,
    getSubjectById: getSubjectById,
    getAllSemester: getAllSemester,
    updateSubject: updateSubject,
    deleteById: deleteById,
    addSubject: addSubject
};