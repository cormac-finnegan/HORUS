var assert = require('assert');
let db = require('../db');


var supertest = require('supertest');
var chai = require('chai');
var app = require('../app.js');

global.app = app;

global.expect = chai.expect;
global.request = supertest(app);

var mysql = require('mysql');
let testDBParams = require('../config/test.json').AWS;

suite('Connections', function () {
    test('Successful connection to AWS test database', function (done) {
        var connection = mysql.createConnection(testDBParams);
        connection.connect(function (err) {
            assert.equal(err, null);
            done()
        });
    });

    test('Failure to connect to AWS test database', function (done) {
        var connection = mysql.createConnection('testDBParams');
        connection.connect(function (err) {
            //console.log(err)
            assert.equal(err.code, 'ECONNREFUSED');
            done()
        });
    });
}).timeout(5000);

suite('Tool inventory', function () {

    before(function (done) {
        //populate db
        db.query('INSERT INTO Tool_Inventory(id,type,description,status,induction_date,MISC) VALUES ' +
            '(1, \'tracker\', \'A tracking device used for geolocation of visitors by the HORUS system\', 0, \'2017-11-16\', \'\'),'+
            '(2, \'tracker\', \'A tracking device used for geolocation of visitors by the HORUS system\', 0, \'2017-11-16\', \'\'),'+
            '(3, \'tracker\', \'A tracking device used for geolocation of visitors by the HORUS system\', 0, \'2017-11-16\', \'\');'
            , null, function(error, rows){
        });
        done()
    });

    // In this test it's expected a task list of two tasks
    describe('GET /tools', function () {
        it('returns a list of tools', function (done) {
            request.get('/rest/toolInventory')
                .expect(200)
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.body).to.have.lengthOf(3);
                    done(err);
                });
        });
    });

    describe('GET /toolInventory/1 equals databsae value (string)', function () {
        it('compare the JSON string values returned match the database', function (done) {
            request.get('/rest/toolInventory/1')
                .expect(200)
                .end(function (err, res) {
                    //console.log(res.body[0]);
                    var compareJSONString = {"id":1,"type":"tracker","description":"A tracking device used for geolocation of visitors by the HORUS system","status":0,"induction_date":"2017-11-16T00:00:00.000Z","MISC":""};
                    //console.log(compareJSONObj);
                    assert.equal(JSON.stringify(res.body[0]), JSON.stringify(compareJSONString));
                    //expect(res.body).to.have.lengthOf(2);
                    done(err);
                });
            });
        });

    describe('GET /toolInventory/1 equals databsae value (Object)', function () {
        it('compare the JSON Object values returned match the database', function (done) {
            request.get('/rest/toolInventory/1')
                .expect(200)
                .end(function (err, res) {
                    var compareJSONString = JSON.stringify({"id":1,"type":"tracker","description":"A tracking device used for geolocation of visitors by the HORUS system","status":0,"induction_date":"2017-11-16T00:00:00.000Z","MISC":""});
                    var bodyString = JSON.stringify(res.body[0]);

                    var compareJSONObj = JSON.parse(compareJSONString);
                    var compareBodyObj = JSON.parse(bodyString);

                    expect(compareJSONObj).to.deep.equal(compareBodyObj);
                    done(err);
                });
        });
    });


    // In this test it's expected a task list of two tasks
    describe('DELETE /toolInventory', function () {
        it('returns a list of tools', function (done) {
            request.delete('/rest/toolInventory/3')
                .expect(200)
                .end(function (err, res) {

                    request.get('/rest/toolInventory')
                        .expect(200)
                        .end(function (err, res) {
                            //console.log(res.body);
                            expect(res.body).to.have.lengthOf(2);
                            done(err);
                        });
                });
        });
    });


    describe('POST /toolInventory', function () {
        it('adds a new tool', function (done) {
            request
                .post('/rest/toolInventory')
                .set("Connection", "keep alive")
                .send({"id":null,"type":"tracker","description":"A test","status":0,"induction_date":"2017-11-16T00:00:00.000Z","MISC":""})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    }
                    request.get('/rest/toolInventory')
                        .expect(200)
                        .end(function (err, res) {
                            //console.log(res.body);
                            expect(res.body).to.have.lengthOf(3);

                            request.get('/rest/toolInventory/3')
                                .expect(200)
                                .end(function (err, res) {
                                    var compareJSONString = JSON.stringify({"id":3,"type":"tracker","description":"A test","status":0,"induction_date":"2017-11-16T00:00:00.000Z","MISC":""});
                                    var bodyString = JSON.stringify(res.body[0]);

                                    var compareJSONObj = JSON.parse(compareJSONString);
                                    var compareBodyObj = JSON.parse(bodyString);

                                    expect(compareJSONObj).to.deep.equal(compareBodyObj);
                                    done(err);
                                });

                            //done(err);
                        });
                });
        });
    });

    describe('PUT /toolInventory', function () {
        it('modify\'s a tool in the database', function (done) {
            request
                .put('/rest/toolInventory')
                .set("Connection", "keep alive")
                .send({"id":null,"type":"tracker","description":"A test","status":0,"induction_date":"2017-11-16T00:00:00.000Z","MISC":""})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    }
                    request.get('/rest/toolInventory')
                        .expect(200)
                        .end(function (err, res) {
                            //console.log(res.body);
                            expect(res.body).to.have.lengthOf(3);

                            request.get('/rest/toolInventory/3')
                                .expect(200)
                                .end(function (err, res) {
                                    var compareJSONString = JSON.stringify({"id":3,"type":"tracker","description":"A test","status":0,"induction_date":"2017-11-16T00:00:00.000Z","MISC":""});
                                    var bodyString = JSON.stringify(res.body[0]);

                                    var compareJSONObj = JSON.parse(compareJSONString);
                                    var compareBodyObj = JSON.parse(bodyString);

                                    expect(compareJSONObj).to.deep.equal(compareBodyObj);
                                    done(err);
                                });

                            //done(err);
                        });
                });
        });
    });

    after(function (done) {
        // I do stuff like deleting populated db
        db.query('DELETE FROM Tool_Inventory;', function (error, rows) {

            done()
        });
        //done()

    });
});
