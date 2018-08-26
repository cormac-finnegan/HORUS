var db = require('../db');

// Get by ID
exports.getVisitorByID = function (id, callback) {
    //console.log('ID: ' + id);
    db.query('SELECT * FROM Visitors where id = ' + id + ';', function (error, results) {

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

// Get all user types
exports.getAllVisitors = function (callback) {
    db.query('SELECT * FROM Visitors;', function (error, results, sql) {
        console.log(sql);
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


