var connection = require('../../config/db');

let getSubject = (id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                'select mana.subjectID, sub.subjectName from managepoint as mana join subject as sub on sub.subjectID = mana.subjectID where mana.studentId = ? and mana.semester = ?', [id, 212],
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

};