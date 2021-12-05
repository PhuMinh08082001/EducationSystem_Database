var connection = require('../../config/db');

let getAllTeachingClass = (lecturerID) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                ' SELECT DISTINCT teach.className, teach.subjectID, teach.semester, subjectName FROM `teach`, `subject` WHERE teach.subjectID = subject.subjectID AND lecturerID = ?', lecturerID,
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


let getAllStdOfClass = (subjectID, className, semester) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                ' SELECT * FROM `managepoint`, `student` WHERE managepoint.studentID = student.studentID AND subjectID = ? AND className = ? AND semester = ?', [subjectID, className, semester],
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




let getFacultyID = () => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                ' SELECT * FROM faculty',
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


let getSemester = () => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                ' SELECT distinct semester  FROM manageSubject',
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
    getAllTeachingClass: getAllTeachingClass,
    getAllStdOfClass: getAllStdOfClass,
    getFacultyID: getFacultyID,
    getSemester: getSemester,
};