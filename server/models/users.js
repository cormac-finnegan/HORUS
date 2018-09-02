var db = require('../db');

// Get by ID
exports.getUserByID = function(id, callback) {
    console.log('ID: ' + id);
    db.query('SELECT * FROM User where id = ' + id + ';', function (error, results) {

        //console.log(this.sql);
        var message = {
            error: undefined,
            results: undefined
        };
        if(error){
            //console.log(error);
            message = {
                error: error,
                results: null
            };
        }else{
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
exports.getUserExistsByUsername = function(username, callback) {
    console.log("Username = " + username)
    db.query('SELECT count(*) as \'userExists\' FROM User where username = \'' + username + '\';', function (error, results) {

        //console.log(this.sql);
        let message = {
            error: undefined,
            results: undefined
        };
        if(error){
            //console.log(error);
            message = {
                error: error,
                results: null
            };
        }else{
            console.log(JSON.stringify(results[0]));
            if(JSON.stringify(results[0].userExists) >= 1){
                message = {
                    error: null,
                    results: true
                };
            }else if(JSON.stringify(results[0].userExists) == 0){
                message = {
                    error: null,
                    results: false
                };
            }

        }
        callback(message);
    });
};

// Get all user types
exports.getAllUsers = function(callback) {

    db.query('SELECT * FROM User;', function (error, results) {
        //console.log(sql);
        var message = {
            error: undefined,
            results: undefined
        };
        if(error){
            //console.log(error);
            message = {
                error: error,
                results: null
            };
        }else{
            //console.log(results);
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });
};


// Add a new user type
exports.addUser = function(user, callback) {
    let userObject = JSON.parse(user);


/*    exports.getUserExistsByUsername(JSON.parse(user).username,  function (callback){

        if(callback.results === true){
            console.log('ERROR: User already Exists')
            message = {
                error: "User Already Exists ",
                results: null
            };
        }else{
        }
    });*/

    db.query('SELECT * FROM User_Type WHERE id = \''+ userObject.type +'\';', function (error, results) {

        let message = {
            error: undefined,
            results: undefined
        };
        if(error){
            //console.log(error);
            message = {
                error: error,
                results: null
            };
        }else {
            //console.log("Type ID " + JSON.stringify(message))
            if (results.length !== 0) {



                var typeId =  JSON.stringify(results[0]);

                typeId = JSON.parse(typeId).id;

                //console.log('Its not NULL: ' + results.length);
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
                if(userObject.id){

                }else{
                    userObject.id = null;
                }


                db.query('INSERT INTO User (id, type, username, password, loggedin, last_login) VALUES (' +
                    '\'' + userObject.id+ '\',' +
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
                    error: new Error(),
                    results: null
                };
                message.error.code = 'ER_NO_USR_TYP';
                message.error.status = 406;
                message.error.errno = 1101;
                callback(message)
            }
        }
    });
};


//Add a new user type
exports.modifyUser = function(id, user, callback) {
    let userObject = JSON.parse(user);

    db.query('SELECT * FROM User_Type WHERE id = \''+ userObject.type +'\';', function (error, results) {

        let message = {
            error: undefined,
            results: undefined
        };
        if(error){
            //console.log(error);
            message = {
                error: error,
                results: null
            };
        }else {
            //console.log("Type ID " + JSON.stringify(message))
            if (results.length !== 0) {
                var typeId =  JSON.stringify(results[0]);

                typeId = JSON.parse(typeId).id;

                db.query('UPDATE User SET ' +
                    'type = ' + typeId + ',' +
                    'username = \'' + userObject.username + '\',' +
                    'password = \'' + userObject.password + '\',' +
                    'loggedin = \''+userObject.loggedin+'\',' +
                    'last_login = \''+userObject.last_login+'\' WHERE id = ' + userObject.id +
                    ';', function (error, results) {
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
                    error: new Error(),
                    results: null
                };
                message.error.code = 'ER_NO_USR_TYP';
                message.error.status = 406;
                message.error.errno = 1101;
                callback(message)
            }
        }
    });
};

// delete a user by ID
exports.deleteUserByID = function(id, callback) {
    console.log('DELETE ID: ' + id);
    db.query('DELETE FROM User where id = ' + id + ';', function (error, results) {

        //console.log(this.sql);
        var message = {
            error: undefined,
            results: undefined
        };
        if(error){
            console.log(error);
            message = {
                error: error,
                results: null
            };
        }else{
            console.log(results);
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });
};

// Get all user types
exports.getAllEmployees = function(callback) {

    db.query('SELECT * FROM User WHERE type = 3;', function (error, results) {
        //console.log(sql);
        var message = {
            error: undefined,
            results: undefined
        };

        if(error){
            //console.log(error);
            message = {
                error: error,
                results: null
            };
        }else{
            //console.log(results);
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });
};