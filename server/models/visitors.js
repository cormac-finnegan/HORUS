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


exports.addVisitor = function (visitor, callback) {
    let visitorObject = JSON.parse(visitor);

    db.query('INSERT INTO Visitors (first_name,last_name,dob,contact_number,next_of_kin,next_of_kin_contact_number,checkin_date,checkout_date,email,tracker_id,user_ref) VALUES (' +
        '\'' + visitorObject.first_name + '\',' +
        '\'' + visitorObject.last_name + '\',' +
        '\'' + visitorObject.dob + '\',' +
        '\'' + visitorObject.contact_number + '\',' +
        '\'' + visitorObject.next_of_kin + '\',' +
        '\'' + visitorObject.next_of_kin_contact_number + '\',' +
        '\'' + visitorObject.checkin_date + '\',' +
        '\'' + visitorObject.checkout_date + '\',' +
        '\'' + visitorObject.email + '\',' +
        '' + visitorObject.tracker_id + ',' +
        '' + visitorObject.user_ref + ');', function (error, results) {
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
            console.log(results);
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });

};


