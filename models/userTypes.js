var db = require('../AWS_db');

// Get by ID
exports.getUserTypeByID = function(id, callback) {
    console.log('ID: ' + id);
    db.query('SELECT * FROM User_Type where id = ' + id + ';', function (error, results) {

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
exports.getAllUserTypes = function(callback) {

   db.query('SELECT * FROM User_Type;', function (error, results, sql) {
        //console.log(sql);
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


// Add a new user type
exports.addUserType = function(userType, callback) {

    let jsonObject = JSON.parse(userType);

    console.log(jsonObject.User_Type.type);

    db.query('INSERT INTO User_Type (id, type) VALUES (\''+jsonObject.User_Type.type+'\');', function (error, results) {
        //console.log(sql);
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


// delete a userType by ID
exports.deleteUserTypeByID = function(id, callback) {
    console.log('ID: ' + id);
    db.query('DELETE FROM User_Type where id = ' + id + ';', function (error, results) {

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
