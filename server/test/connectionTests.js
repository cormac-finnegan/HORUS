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
        //console.log(err)
        assert.equal(err.code, 'ECONNREFUSED');
        done()
    });
});

suite('GET Tools', function () {

    // In this test it's expected a task list of two tasks
    describe('Tools', function () {

        it('returns a list of tools', function (done) {
            db.query('DELETE FROM Tool_Inventory;', function (error, rows) {
                console.log("\n\n - - - shared after - - - \n\n");

            });
            db.query('INSERT INTO Tool_Inventory(id,type,description,status,induction_date,MISC) VALUES ' +
                '(1, \'tracker\', \'A tracking device used for geolocation of visitors by the HORUS system\', 0, \'2017-11-16\', \'\'),' +
                '(2, \'tracker\', \'A tracking device used for geolocation of visitors by the HORUS system\', 0, \'2017-11-16\', \'\'),' +
                '(3, \'tracker\', \'A tracking device used for geolocation of visitors by the HORUS system\', 0, \'2017-11-16\', \'\');'
                , function (error, rows) {
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
        db.query('DELETE FROM Tool_Inventory;', function (error, rows) {
            console.log("\n\n - - - shared after - - - \n\n");

        });

    });


});



suite('GET /trackerNodes', function () {

    // In this test it's expected a task list of two tasks
    describe('Trackers', function () {

        it('returns a list of trackers', function (done) {
            db.query('DELETE FROM Tracker_Node;', function (error, rows) {
                console.log("\n\n - - - shared after - - - \n\n");

            });
            db.query('INSERT INTO Tracker_Node(id,tool_id_fk,latitude,longitude,enabled,distress, timestamp) VALUES ' +
                "(1, 8,35.673494,-112.326986,1, 0, \'2018-04-06 00:00:00\'),"+
                "(2, 8,35.673494,-112.326986,1, 0, \'2018-04-06 03:00:00\'),"+
                "(3, 8,35.673494,-112.326986,1, 0, \'2018-04-06 06:00:00\')"
                , function (error, rows) {
                    console.log("\n\n - - - shared before - - - \n\n");
                    console.log(error)

                });
            console.log("\n\n - - - returns a list of tools - - - \n\n");
            request.get('/rest/trackerNode')
                .expect(200)
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.body).to.have.lengthOf(3);
                    done(err);
                });
        });

        it('compare the JSON string values returned match the database', function (done) {
            console.log("\n\n - - - compare the JSON string values returned match the database - - - \n\n");
            request.get('/rest/trackerNode/1')
                .expect(200)
                .end(function (err, res) {
                    //console.log(res.body[0]);
                    var compareJSONString = {
                        "id":1,
                        "tool_id_fk":8,
                        "latitude":35.673494,
                        "longitude":-112.326986,
                        "enabled":1,
                        "distress":0,
                        "timestamp":"2018-04-06T00:00:00.000Z"
                    };
                    //console.log(compareJSONObj);
                    assert.equal(JSON.stringify(res.body[0]), JSON.stringify(compareJSONString));
                    //expect(res.body).to.have.lengthOf(2);
                    done(err);
                });
        });

        it('compare the JSON Object values returned match the database', function (done) {
            console.log("\n\n - - - compare the JSON Object values returned match the database - - - \n\n");
            request.get('/rest/trackerNode/2')
                .expect(200)
                .end(function (err, res) {
                    var compareJSONString = JSON.stringify({
                        "id":2,
                        "tool_id_fk":8,
                        "latitude":35.673494,
                        "longitude":-112.326986,
                        "enabled":1,
                        "distress":0,
                        "timestamp":"2018-04-06T03:00:00.000Z"
                    });
                    var bodyString = JSON.stringify(res.body[0]);

                    var compareJSONObj = JSON.parse(compareJSONString);
                    var compareBodyObj = JSON.parse(bodyString);

                    expect(compareJSONObj).to.deep.equal(compareBodyObj);
                    done(err);
                });
        });

        it('deletes a tracker', function (done) {
            console.log("\n\n - - - returns a list of trackers - - - \n\n");
            request.delete('/rest/trackerNode/3')
                .expect(200)
                .end(function (err, res) {

                    request.get('/rest/trackerNode')
                        .expect(200)
                        .end(function (err, res) {
                            //console.log(res.body);
                            expect(res.body).to.have.lengthOf(2);
                            done(err);
                        });
                });
        });

        it('adds a new tracker', function (done) {
            console.log("\n\n - - - adds a new tracker - - - \n\n");
            request
                .post('/rest/trackerNode')
                .set("Connection", "keep alive")
                .send({
                    "id":9,
                    "tool_id_fk":4,
                    "latitude":30.672434,
                    "longitude":-2.326986,
                    "enabled":0,
                    "distress":0,
                    "timestamp":"2018-04-06 03:12:00"
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    request.get('/rest/trackerNode')
                        .expect(200)
                        .end(function (err, res) {
                            //console.log(res.body);
                            expect(res.body).to.have.lengthOf(3);

                            request.get('/rest/trackerNode/9')
                                .expect(200)
                                .end(function (err, res) {
                                    var compareJSONString = JSON.stringify({
                                        "id":9,
                                        "tool_id_fk":4,
                                        "latitude":30.672434,
                                        "longitude":-2.326986,
                                        "enabled":0,
                                        "distress":0,
                                        "timestamp":"2018-04-06T03:12:00.000Z"
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

        it('modify\'s a tracker in the database', function (done) {
            console.log("\n\n - - - modify\'s a tracker in the database - - - \n\n");
            request
                .put('/rest/trackerNode/2')
                .set("Connection", "keep alive")
                //.expect(200)
                .expect('Content-Type', /json/)
                .send({
                    "id":2,
                    "tool_id_fk":4,
                    "latitude":30.672434,
                    "longitude":-2.326986,
                    "enabled":0,
                    "distress":1,
                    "timestamp":"2018-04-06 03:13:00"
                })
                .end(function (err, res) {


                    done(err);
                });

            db.query('DELETE FROM Tracker_Node;', function (error, rows) {
                console.log("\n\n - - - shared after - - - \n\n");

            });
        });
    });


    suite('GET /userTypes', function () {

        // In this test it's expected a task list of two tasks
        describe('User Types', function () {

            it('returns a list of all userTypes', function (done) {
                db.query('DELETE FROM User_Type;', function (error, rows) {
                    console.log("\n\n - - - shared after - - - \n\n");

                });
                db.query('INSERT INTO User_Type(id, type) VALUES ' +
                    "(1, 'ADMIN'),"+
                    "(2, 'SAR'),"+
                    "(3, 'NPR'),"+
                    "(4, 'Visitor'),"+
                    "(5, 'TEST')"
                    , function (error, rows) {
                        console.log("\n\n - - - shared before - - - \n\n");
                        console.log(error)

                    });
                console.log("\n\n - - - returns a list of tools - - - \n\n");
                request.get('/rest/userTypes')
                    .expect(200)
                    .end(function (err, res) {
                        console.log(res.body);
                        expect(res.body).to.have.lengthOf(5);
                        done(err);
                    });
            });

            it('compare the JSON string values returned match the database', function (done) {
                console.log("\n\n - - - compare the JSON string values returned match the database - - - \n\n");
                request.get('/rest/trackerNode/1')
                    .expect(200)
                    .end(function (err, res) {
                        //console.log(res.body[0]);
                        var compareJSONString = {
                            "id":1,
                            "tool_id_fk":8,
                            "latitude":35.673494,
                            "longitude":-112.326986,
                            "enabled":1,
                            "distress":0,
                            "timestamp":"2018-04-06T00:00:00.000Z"
                        };
                        //console.log(compareJSONObj);
                        assert.equal(JSON.stringify(res.body[0]), JSON.stringify(compareJSONString));
                        //expect(res.body).to.have.lengthOf(2);
                        done(err);
                    });
            });

            it('compare the JSON Object values returned match the database', function (done) {
                console.log("\n\n - - - compare the JSON Object values returned match the database - - - \n\n");
                request.get('/rest/trackerNode/2')
                    .expect(200)
                    .end(function (err, res) {
                        var compareJSONString = JSON.stringify({
                            "id":2,
                            "tool_id_fk":8,
                            "latitude":35.673494,
                            "longitude":-112.326986,
                            "enabled":1,
                            "distress":0,
                            "timestamp":"2018-04-06T03:00:00.000Z"
                        });
                        var bodyString = JSON.stringify(res.body[0]);

                        var compareJSONObj = JSON.parse(compareJSONString);
                        var compareBodyObj = JSON.parse(bodyString);

                        expect(compareJSONObj).to.deep.equal(compareBodyObj);
                        done(err);
                    });
            });

            it('deletes a tracker', function (done) {
                console.log("\n\n - - - returns a list of trackers - - - \n\n");
                request.delete('/rest/trackerNode/3')
                    .expect(200)
                    .end(function (err, res) {

                        request.get('/rest/trackerNode')
                            .expect(200)
                            .end(function (err, res) {
                                //console.log(res.body);
                                expect(res.body).to.have.lengthOf(2);
                                done(err);
                            });
                    });
            });

            it('adds a new tracker', function (done) {
                console.log("\n\n - - - adds a new tracker - - - \n\n");
                request
                    .post('/rest/trackerNode')
                    .set("Connection", "keep alive")
                    .send({
                        "id":9,
                        "tool_id_fk":4,
                        "latitude":30.672434,
                        "longitude":-2.326986,
                        "enabled":0,
                        "distress":0,
                        "timestamp":"2018-04-06 03:12:00"
                    })
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        request.get('/rest/trackerNode')
                            .expect(200)
                            .end(function (err, res) {
                                //console.log(res.body);
                                expect(res.body).to.have.lengthOf(3);

                                request.get('/rest/trackerNode/9')
                                    .expect(200)
                                    .end(function (err, res) {
                                        var compareJSONString = JSON.stringify({
                                            "id":9,
                                            "tool_id_fk":4,
                                            "latitude":30.672434,
                                            "longitude":-2.326986,
                                            "enabled":0,
                                            "distress":0,
                                            "timestamp":"2018-04-06T03:12:00.000Z"
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

            it('modify\'s a tracker in the database', function (done) {
                console.log("\n\n - - - modify\'s a tracker in the database - - - \n\n");
                request
                    .put('/rest/trackerNode/2')
                    .set("Connection", "keep alive")
                    //.expect(200)
                    .expect('Content-Type', /json/)
                    .send({
                        "id":2,
                        "tool_id_fk":4,
                        "latitude":30.672434,
                        "longitude":-2.326986,
                        "enabled":0,
                        "distress":1,
                        "timestamp":"2018-04-06 03:13:00"
                    })
                    .end(function (err, res) {


                        done(err);
                    });

                db.query('DELETE FROM Tracker_Node;', function (error, rows) {
                    console.log("\n\n - - - shared after - - - \n\n");

                });
            });
        });


})});


