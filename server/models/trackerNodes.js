var db = require('../db')

// Get by ID
exports.getTrackerNodeByID = function(id, callback) {
    console.log('ID: ' + id);
    db.query('SELECT * FROM Tracker_Node where id = ' + id + ';', function (error, results) {

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

// Get by Tool ID
exports.getTrackerNodeByToolID = function(id, callback) {
    console.log('ID: ' + id);
    db.query('SELECT * FROM Tracker_Node where tool_id_fk = ' + id + ';', function (error, results) {

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

// Get latest by Tool ID
exports.getLatestTrackerNodeByToolID = function(id, callback) {
    console.log('ID: ' + id);
    db.query('SELECT * FROM Tracker_Node WHERE tool_id_fk = ' + id + ' ORDER BY timestamp DESC LIMIT 1;', function (error, results) {

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
exports.getAllTrackerNodes = function(callback) {

    db.query('SELECT * FROM Tracker_Node;', function (error, results, sql) {
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
exports.addTrackerNode = function(TrackerNode, callback) {

    let tracker = JSON.parse(TrackerNode);

    console.log(tracker.type);

    db.query('INSERT INTO Tracker_Node (' +
        'id, ' +
        'tool_id_fk, ' +
        'latitude, ' +
        'longitude, ' +
        'enabled, ' +
        'distress, ' +
        'timestamp) VALUES (' +
        '\''+tracker.id+'\', ' +
        '\''+tracker.tool_id_fk+'\', ' +
        '\''+tracker.latitude+'\', ' +
        '\''+tracker.longitude+'\', ' +
        '\''+tracker.enabled+'\', ' +
        '\''+tracker.distress+'\', ' +
        '\''+tracker.timestamp+'\');', function (error, results) {
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


// delete a Tracker_Node by ID
exports.deleteTrackerNodeByID = function(id, callback) {
    console.log('ID: ' + id);
    db.query('DELETE FROM Tracker_Node where id = ' + id + ';', function (error, results) {

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


exports.modifyTracker = function (id, tracker, callback) {
    console.log('ID: ' + id);
    console.log('\nTracker: ' + tracker.latitude);
    let newTracker = tracker;

    db.query('UPDATE Tracker_Node '+
        'SET ' +
        'id = ' + newTracker.id + ', ' +
        'tool_id_fk = ' + newTracker.tool_id_fk + ', ' +
        'latitude = ' + newTracker.latitude + ', ' +
        'longitude = ' + newTracker.longitude + ', ' +
        'enabled = ' + newTracker.enabled + ', ' +
        'distress = ' + newTracker.distress + ', ' +
        'timestamp = \'' + newTracker.timestamp + '\' ' +
        ' where id = ' + id + ';', function (error, results) {
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