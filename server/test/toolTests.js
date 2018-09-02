var assert = require('assert');
let db = require('../db');


var supertest = require('supertest');
var chai = require('chai');
var app = require('../app.js');
global.app = app;

global.expect = chai.expect;
global.request = supertest(app);

suite('GET Tools', function () {

    // In this test it's expected a task list of two tasks
    describe('Tools', function () {

        it('delete database', function (done) {
            db.query('DELETE FROM Tool_Inventory;', function (error, rows) {
                //console.log("\n\n - - - shared after - - - \n\n");
                console.log('D E L E T E');
                done()
            });
        });

        it('populate database', function (done) {
            db.query('INSERT INTO Tool_Inventory(id,type,description,status,induction_date,MISC) VALUES ' +
                '(1, \'tracker\', \'A tracking device used for geolocation of visitors by the HORUS system\', 0, \'2017-11-16\', \'\'),' +
                '(2, \'tracker\', \'A tracking device used for geolocation of visitors by the HORUS system\', 0, \'2017-11-16\', \'\'),' +
                '(3, \'tracker\', \'A tracking device used for geolocation of visitors by the HORUS system\', 0, \'2017-11-16\', \'\');'
                , function (error, rows) {
                    console.log("\n\n - - - shared before - - - \n\n");
                    done()

                });
        });


        it('returns a list of tools', function (done) {
            console.log("\n\n - - - returns a list of tools - - - \n\n");
            request.get('/rest/toolInventory')
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.status).to.equal(200)
                    expect(res.body).to.have.lengthOf(3);
                    done(err);
                });
        });

        it('compare the JSON string values returned match the database', function (done) {
            console.log("\n\n - - - compare the JSON string values returned match the database - - - \n\n");
            request.get('/rest/toolInventory/1')
                .end(function (err, res) {
                    expect(res.status).to.equal(200)
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

        it('get all trackers in tool inventory', function (done) {
            request.get('/rest/toolInventory/type=tracker')
                .end(function (err, res) {
                    console.log(JSON.stringify(res))
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.lengthOf(3);
                    done(err);
                });
        });

        it('get all trackers in tool inventory', function (done) {
            request.get('/rest/toolInventory/type=tracker')
                .end(function (err, res) {
                    console.log(JSON.stringify(res))
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.lengthOf(3);
                    done(err);
                });
        });

        it('get a tool that doesn\'t exist', function (done) {
            request.get('/rest/toolInventory/101')
                .end(function (err, res) {
                    expect(res.body).to.have.length(0);
                    done()
                });
        });

        it('get a tool with an invalid number', function (done) {
            request.get('/rest/toolInventory/g')
                .end(function (err, res) {
                    expect(res.status).to.equal(404)
                    done()
                });
        });

        it('get a tool with a mixed number', function (done) {
            request.get('/rest/toolInventory/1g3')
                .end(function (err, res) {
                    expect(res.status).to.equal(404)
                    done()
                });
        });

        it('compare the JSON Object values returned match the database', function (done) {
            console.log("\n\n - - - compare the JSON Object values returned match the database - - - \n\n");
            request.get('/rest/toolInventory/1')
                .end(function (err, res) {
                    expect(res.status).to.equal(200)
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
            request.delete('/rest/toolInventory/3')
                .end(function (err, res) {
                    expect(res.status).to.equal(200)
                    request.get('/rest/toolInventory')
                        .end(function (err, res) {
                            expect(res.status).to.equal(200)
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
                    expect(res.body.insertId).to.equal(3);
                    done(err)
                });
        });

        it('attempts to add a malformed tool JSON', function (done) {
            console.log("\n\n - - - adds a new tool - - - \n\n");
            request
                .post('/rest/toolInventory')
                .set("Connection", "keep alive")
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    expect(res.status).to.equal(404)
                    done(err)
                });
        });

        it('checks size after new tool', function (done) {
            request.get('/rest/toolInventory')
                .expect(200)
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.body).to.have.lengthOf(3);
                    done(err);
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

                    request.get('/rest/toolInventory/3')
                        .expect(200)
                        .end(function (err, res) {
                            var compareJSONString = JSON.stringify({
                                "id": 3,
                                "type": "tracker",
                                "description": "PUT test",
                                "status": 0,
                                "induction_date": "2017-11-16T00:00:00.000Z",
                                "MISC": "modifys a tool in the database"
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

});





