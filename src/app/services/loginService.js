var bcrypt = require('bcryptjs');
var connection = require('../../config/db');


let handleLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        //check email is exist or not
        let user = await findUserByEmail(email);
        if (user) {
            //compare password
            await bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    reject(`The password that you've entered is incorrect`);
                }
            });
        } else {
            reject(`This user email "${email}" doesn't exist`);
        }
    });
};

let findStudentById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                ' SELECT * FROM `student` WHERE `studentID` = ?  ', id,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }

                    let user = rows[0];
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
}

let findLecturerById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                ' SELECT * FROM `lecturer` WHERE `lecturerID` = ?  ', id,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }

                    let user = rows[0];
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
}

let findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                ' SELECT * FROM `users` WHERE `email` = ?  ', email,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    let user = rows[0];
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                ' SELECT * FROM `users` WHERE `id` = ?  ', id,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    let user = rows[0];
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let comparePassword = (password, userObject) => {
    return new Promise(async(resolve, reject) => {
        try {

            if (password == userObject.password) {
                resolve(true);
            } else {
                resolve(`The password that you've entered is incorrect`);
            }

        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleLogin: handleLogin,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById,
    comparePassword: comparePassword.apply,
    findStudentById: findStudentById,
    findLecturerById: findLecturerById,
};