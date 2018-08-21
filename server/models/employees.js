var db = require('../db');

// Get by ID
exports.getEmployeeByID = function (id, callback) {
    console.log('ID: ' + id);
    db.query('SELECT * FROM Employee where id = ' + id + ';', function (error, results) {

        //console.log(this.sql);
        var message = {
            error: undefined,
            results: undefined
        };
        if (error) {
            //console.log(error);
            message = {
                error: error,
                results: null
            };
        } else {
            //console.log(results);
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });
};

exports.getEmployeeByUserID = function (id, callback) {
    console.log('ID: ' + id);
    db.query('SELECT * FROM Employee where user_ref = ' + id + ';', function (error, results) {

        //console.log(this.sql);
        var message = {
            error: undefined,
            results: undefined
        };
        if (error) {
            //console.log(error);
            message = {
                error: error,
                results: null
            };
        } else {
            //console.log(results);
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });
};

// Get by Username
exports.getEmployeeRecordUsername = function (username, callback) {
    db.query('SELECT Employee.id, first_name, last_name, contact_number,walkie_talkie_channel,hire_date, email,user_ref ' +
        'FROM Employee  ' +
        'JOIN Employee ON Employee.user_ref=Employee.id ' +
        'WHERE Employee.username =  \'' + username + '\';', function (error, results) {

            //console.log(this.sql);
            var message = {
                error: undefined,
                results: undefined
            };
            if (error) {
                message = {
                    error: error,
                    results: null
                };
            } else {
                message = {
                    error: null,
                    results: results
                };
                callback(message);
            }
        }
    );
};

// Get by Username
exports.getEmployeeExistsByUsername = function (username, callback) {
    db.query('SELECT count(*) as \'userExists\' ' +
        'FROM Employee  ' +
        'JOIN Employee ON Employee.user_ref=Employee.id ' +
        'WHERE Employee.username =  \'' + username + '\';', function (error, results) {

        //console.log(this.sql);
        var message = {
            error: undefined,
            results: undefined
        };
        if (error) {
            //console.log(error);
            message = {
                error: error,
                results: null
            };
        } else {
            if (JSON.stringify(results[0].userExists) >= 1) {
                message = {
                    error: null,
                    results: true
                };
            } else if (JSON.stringify(results[0].userExists) == 0) {
                message = {
                    error: null,
                    results: false
                };
            }

        }
        callback(message);
    });
};

// Get all employee types
exports.getAllEmployees = function (callback) {

    db.query('SELECT * FROM Employee;', function (error, results) {
        console.log("IN");
        var message = {
            error: undefined,
            results: undefined
        };
        if (error) {
            //console.log(error);
            message = {
                error: error,
                results: null
            };
        } else {
            //console.log(results);
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });
};


// Add a new employee type
exports.addEmployee = function (employee, callback) {
    let userObject = JSON.parse(employee);
    console.log("Add Employee")


    db.query('INSERT INTO Employee (first_name,last_name,dob,contact_number,walkie_talkie_channel,hire_date,email, user_ref) VALUES (' +
        '\'' + userObject.first_name + '\',' +
        '\'' + userObject.last_name + '\',' +
        '\'' + userObject.dob + '\',' +
        '\'' + userObject.contact_number + '\',' +
        '\'' + userObject.walkie_talkie_channel + '\',' +
        '\'' + userObject.hire_date + '\',' +
        '\'' + userObject.email + '\',' +
        '\'' + userObject.user_ref + '\');', function (error, results) {
        //console.log(sql);
        if (error) {
            console.log(error);
            message = {
                error: error,
                results: null
            };
        } else {
            console.log(results);
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });


};


// delete a employee by ID
exports.deleteEmployeeByID = function (id, callback) {
    console.log('ID: ' + id);
    db.query('DELETE FROM Employee where id = ' + id + ';', function (error, results) {

        //console.log(this.sql);
        var message = {
            error: undefined,
            results: undefined
        };
        if (error) {
            console.log(error);
            message = {
                error: error,
                results: null
            };
        } else {
            console.log(results);
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });
};

