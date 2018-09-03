var assert = require('assert');
let db = require('../db');


var supertest = require('supertest');
var chai = require('chai');
var app = require('../app.js');
global.app = app;

global.expect = chai.expect;
global.request = supertest(app);

var mysql = require('mysql');


let testDBParams = require('../config/test.json').local;


it('Successful connection to AWS test database', function (done) {
    var connection = mysql.createConnection(testDBParams);
    connection.connect(function (err) {
        assert.equal(err, null);
        done()
    });
});

it('Failure to connect to AWS test database', function (done) {
    var connection = mysql.createConnection('testDBParams');
    connection.connect(function (err) {
        console.log(err)
        assert.equal(err.code, 'ER_ACCESS_DENIED_ERROR');
        done()
    });
});



