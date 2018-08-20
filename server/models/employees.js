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
        }}
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
exports.addEmployee = function (employee, user, callback) {
    let userObject = JSON.parse(employee);

    exports.getEmployeeExistsByUsername(JSON.parse(employee).username, function (callback) {

        if (callback.results === true) {
            console.log('ERROR: Employee already Exists')
            message = {
                error: "Employee Already Exists ",
                results: null
            };
        } else {
        }
    });

    db.query('SELECT * FROM User_Type WHERE type = \'' + userObject.type + '\';', function (error, results) {
        //console.log(sql);
        var typeId = JSON.stringify(results[0]);
        typeId = JSON.parse(typeId).id;

        console.log("!!!!!!!!!!!!!!!!!!ID: " + JSON.parse(typeId).id);

        let message = {
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

            if (results.length !== 0) {
                console.log('Its not NULL: ' + results.length);
                if (userObject.username.length <= 4) {
                    message = {
                        error: 'Username too short, must be greater that 5 characters',
                        results: null
                    };
                }
                if (userObject.password.length <= 4) {
                    message = {
                        error: 'Password too short, must be greater that 5 characters',
                        results: null
                    };
                }

                //Create User First
                exports.addUser(user, function (callback) {

                });

                db.query('INSERT INTO Employee (first_name,last_name,dob,contact_number,walkie_talkie_channel,hire_date,email, ) VALUES (' +
                    '\'' + typeId + '\',' +
                    '\'' + userObject.username + '\',' +
                    '\'' + userObject.password + '\',' +
                    '0,' +
                    'NULL);', function (error, results) {
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
            } else {
                message = {
                    error: "Employee Type does not exist",
                    results: null
                };
            }
        }
    });
};


// delete a employee by ID
exports.deleteUserByID = function (id, callback) {
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

