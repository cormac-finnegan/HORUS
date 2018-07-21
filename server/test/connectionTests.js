var assert = require('assert');
let db = require('../db');


var supertest = require('supertest');
var chai = require('chai');
var app = require('../app.js');
//var mocha = require('mocha');
global.app = app;

global.expect = chai.expect;
global.request = supertest(app);

var mysql = require('mysql');


let testDBParams = require('../config/test.json').local;


/*before(function (done) {
 console.log("\n\n - - - shared before - - - \n\n");
 db.query('INSERT INTO Tool_Inventory(id,type,description,status,induction_date,MISC) VALUES ' +
 '(1, \'tracker\', \'A tracking device used for geolocation of visitors by the HORUS system\', 0, \'2017-11-16\', \'\'),' +
 '(2, \'tracker\', \'A tracking device used for geolocation of visitors by the HORUS system\', 0, \'2017-11-16\', \'\'),' +
 '(3, \'tracker\', \'A tracking device used for geolocation of visitors by the HORUS system\', 0, \'2017-11-16\', \'\');'
 , null, function (error, rows) {

 done();
 });
 });*/


suite('GET /tools', function () {
    /*    beforeEach(function(done){


     });

     afterEach(function (done) {

     // runs before all tests in this block

     });*/

    // In this test it's expected a task list of two tasks
    describe('GET /tools', function () {

        it('returns a list of tools', function (done) {
            db.query('INSERT INTO Tool_Inventory(id,type,description,status,induction_date,MISC) VALUES ' +
                '(1, \'tracker\', \'A tracking device used for geolocation of visitors by the HORUS system\', 0, \'2017-11-16\', \'\'),' +
                '(2, \'tracker\', \'A tracking device used for geolocation of visitors by the HORUS system\', 0, \'2017-11-16\', \'\'),' +
                '(3, \'tracker\', \'A tracking device used for geolocation of visitors by the HORUS system\', 0, \'2017-11-16\', \'\');'
                , null, function (error, rows) {
                    console.log("\n\n - - - shared before - - - \n\n");

                });
            console.log("\n\n - - - returns a list of tools - - - \n\n");
            request.get('/rest/toolInventory')
                .expect(200)
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.body).to.have.lengthOf(3);
                    done(err);
                });
        });

        it('compare the JSON string values returned match the database', function (done) {
            console.log("\n\n - - - compare the JSON string values returned match the database - - - \n\n");
            request.get('/rest/toolInventory/1')
                .expect(200)
                .end(function (err, res) {
                    //console.log(res.body[0]);
                    var compareJSONString = {
                        "id": 1,
                        "type": "tracker",
                        "description": "A tracking device used for geolocation of visitors by the HORUS system",
                        "status": 0,
                        "induction_date": "2017-11-16T00:00:00.000Z",
                        "MISC": ""
                    };
                    //console.log(compareJSONObj);
                    assert.equal(JSON.stringify(res.body[0]), JSON.stringify(compareJSONString));
                    //expect(res.body).to.have.lengthOf(2);
                    done(err);
                });
        });

        it('compare the JSON Object values returned match the database', function (done) {
            console.log("\n\n - - - compare the JSON Object values returned match the database - - - \n\n");
            request.get('/rest/toolInventory/1')
                .expect(200)
                .end(function (err, res) {
                    var compareJSONString = JSON.stringify({
                        "id": 1,
                        "type": "tracker",
                        "description": "A tracking device used for geolocation of visitors by the HORUS system",
                        "status": 0,
                        "induction_date": "2017-11-16T00:00:00.000Z",
                        "MISC": ""
                    });
                    var bodyString = JSON.stringify(res.body[0]);

                    var compareJSONObj = JSON.parse(compareJSONString);
                    var compareBodyObj = JSON.parse(bodyString);

                    expect(compareJSONObj).to.deep.equal(compareBodyObj);
                    done(err);
                });
        });

        it('deletes a tool', function (done) {
            console.log("\n\n - - - returns a list of tools - - - \n\n");
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

        it('adds a new tool', function (done) {
            console.log("\n\n - - - adds a new tool - - - \n\n");
            request
                .post('/rest/toolInventory')
                .set("Connection", "keep alive")
                .send({
                    "id": null,
                    "type": "tracker",
                    "description": "New Tool Test",
                    "status": 0,
                    "induction_date": "2017-11-16",
                    "MISC": ""
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    request.get('/rest/toolInventory')
                        .expect(200)
                        .end(function (err, res) {
                            //console.log(res.body);
                            expect(res.body).to.have.lengthOf(3);

                            request.get('/rest/toolInventory/3')
                                .expect(200)
                                .end(function (err, res) {
                                    var compareJSONString = JSON.stringify({
                                        "id": 3,
                                        "type": "tracker",
                                        "description": "New Tool Test",
                                        "status": 0,
                                        "induction_date": "2017-11-16T00:00:00.000Z",
                                        "MISC": ""
                                    });
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


        it('modify\'s a tool in the database', function (done) {
            console.log("\n\n - - - modify\'s a tool in the database - - - \n\n");
            request
                .put('/rest/toolInventory/3')
                .set("Connection", "keep alive")
                .expect(200)
                .expect('Content-Type', /json/)
                .send({
                    "id": 3,
                    "type": "tracker",
                    "description": "PUT test",
                    "status": 0,
                    "induction_date": "2017-11-16",
                    "MISC": "modifys a tool in the database"
                })
                .end(function (err, res) {

                    /*request.get('/rest/toolInventory/3')
                        .expect(200)
                        .end(function (err, res) {
                            var compareJSONString = JSON.stringify({
                                "id": 3,
                                "type": "tracker",
                                "description": "PUT test",
                                "status": 0,
                                "induction_date": "2017-11-16",
                                "MISC": "modify\'s a tool in the database"
                            });
                            var bodyString = JSON.stringify(res.body[0]);

                            var compareJSONObj = JSON.parse(compareJSONString);
                            var compareBodyObj = JSON.parse(bodyString);

                            expect(compareJSONObj).to.deep.equal(compareBodyObj);
                            done(err);
                        });*/
                    done(err);
                });
            db.query('DELETE FROM Tool_Inventory;', null, function (error, rows) {
                console.log("\n\n - - - shared after - - - \n\n");

            });
        });


    });


});




