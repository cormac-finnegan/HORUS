/**
 * Created by A.I.T on 7/18/18.
 */
let mysql = require('mysql');


var TEST_DB = require('./config/test.json').AWS;
exports.DEV_DB = require('./config/dev.json').AWS;

var pool  = mysql.createPool(TEST_DB);

/*var connection = pool.getConnection(function(err, connection) {
    if (err !== null) {
        if (err.fatal) {
            console.trace('fatal error: ' + err.message);
        }
        console.log("[MYSQL] Error connecting to mysql:" + err+'\n');
    }
    // Use the connection
    /!*connection.query('SELECT something FROM sometable', function (error, results, fields) {
        // And done with the connection.
        connection.release();

        // Handle error after the release.
        if (error) throw error;

        // Don't use the connection here, it has been returned to the pool.
    });*!/
});*/

//connection.connect()

/*connection.connect(function(err) {
    if (err !== null) {
        if (err.fatal) {
            console.trace('fatal error: ' + err.message);
        }
        console.log("[MYSQL] Error connecting to mysql:" + err+'\n');
    }
});*/

//module.exports = connection;

/*exports.connection = {
    _query: function (SQL, callback) {
        pool.getConnection(function(err, con) {
            console.log("QUERY: [ " + SQL + " ]");
            con.query(SQL, params, function (error, results) {
                if (error) {
                    return callback(error, null);
                }
                callback(undefined, results)
            });
        })
    }
};*/

var db = (function () {

    function _query(query, params, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                //connection.release();
                //callback(null, err);
                throw err;
            }

            connection.query(query, params, function (err, rows) {
                connection.release();
                if (!err) {
                    callback(rows);
                }
                else {
                    callback(null, err);
                }

            });

            connection.on('error', function (err) {

                callback(null, err);
                connection.release();
                throw err;
            });
        });
    };

    return {
        query: _query
    };
})();

module.exports = db;


