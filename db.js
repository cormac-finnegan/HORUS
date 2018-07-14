var mysql = require('mysql'), async = require('async');

var PRODUCTION_DB = 'horus_system', TEST_DB = 'horus_test';

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    port     : '3307',
    database : TEST_DB
});

module.exports = { connection: connection };

module.exports = {
    query: function(query, callback){
        connection.query(query, function(error, results) {
            if(error){
                return callback(error, null);
            }
            //console.log(rows);
            callback(undefined, results)
        });
    }
};
