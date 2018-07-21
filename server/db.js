/**
 * Created by A.I.T on 7/18/18.
 */
let mysql = require('mysql');


var TEST_DB = require('./config/test.json').AWS;
exports.DEV_DB = require('./config/dev.json').AWS;
var LOCAL_TEST_DB = require('./config/test.json').local

var pool  = mysql.createPool(LOCAL_TEST_DB);

var db = (function () {

    function _query(query, params, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                //connection.release();
                //callback(null, err);
                console.log(err)
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


