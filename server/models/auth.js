var db = require('../db');
var moment = require('moment');

// Get by Username
exports.getPasswordByUsername = function(username, callback) {
    console.log('Username: ' + username);
    db.query('SELECT DISTINCT password FROM User where username = \'' + username + '\';', function (error, results) {

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
            if(results.length > 0){
                message = {
                    error: null,
                    results: results
                };
            }else{
                message = {
                    error: "Incorrect Username or Password",
                    internelError: "Username not found",
                    results: null
                };
            }

        }
        callback(message);
    });
};
//moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
exports.updateUserLoginTimestamp = function(username, callback) {
    console.log('Username: ' + username);
    db.query('UPDATE User SET last_login = \'' + moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') + '\' WHERE username = \''+ username +'\';', function (error, results) {

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

exports.loginUser = function(username, callback) {
    console.log('Username: ' + username);
    db.query('UPDATE User SET loggedin = true WHERE username = \''+ username +'\';', function (error, results) {

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
            exports.updateUserLoginTimestamp(username, function(callback){
                console.log("\nLOGIN COMPLETE\n");
            });
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });
};

exports.logoutUser = function(username, callback) {
    console.log('Username: ' + username);
    db.query('UPDATE User SET loggedin = false WHERE username = \''+ username +'\';', function (error, results) {

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
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });
};

exports.getUserByUsername = function(username, callback) {
    console.log('Username: ' + username);
    db.query('SELECT * FROM User WHERE username = \''+ username +'\';', function (error, results) {

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
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });
};

