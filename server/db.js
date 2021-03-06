/**
 * Created by A.I.T on 7/18/18.
 */
let mysql = require('mysql');


let TEST_DB = require('./config/test.json').AWS;
exports.DEV_DB = require('./config/dev.json').AWS;
let LOCAL_TEST_DB = require('./config/test.json').local;

let pool  = mysql.createPool(TEST_DB);

let db = (function () {

    function _query(query, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                throw err;
            }else{
                connection.query(query, function (err, rows) {
                    if (!err) {
                        callback(null, rows);
                    }
                    else {
                        callback(err, null);
                    }
                    connection.release();
                    connection.destroy();
                });

                connection.on('error', function (err) {

                    callback(null, err);
                    connection.release();
                    throw err;
                });
            }
        });
    }
    return {
        query: _query
    };
})();

module.exports = db;


