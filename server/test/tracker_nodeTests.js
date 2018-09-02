var assert = require('assert');
let db = require('../db');


var supertest = require('supertest');
var chai = require('chai');
var app = require('../app.js');
global.app = app;

global.expect = chai.expect;
global.request = supertest(app);

suite('GET Tracker Nodes', function () {

    // In this test it's expected a task list of two tasks
    describe('Tracker Nodes', function () {

        it('delete database', function (done) {
            db.query('DELETE FROM Tracker_Node;', function (error, rows) {
                //console.log("\n\n - - - shared after - - - \n\n");
                console.log('D E L E T E');
                done()
            });
        });

        it('populate database', function (done) {
            db.query('INSERT INTO Tracker_Node(id,tool_id_fk,latitude,longitude,enabled,distress, timestamp) VALUES ' +
                '(1, 1, 35.67349400, -112.32698600, 1, 0, \'2018-04-06 00:00:00\'),' +
                '(2, 1, 35.67349400, -111.32698600, 1, 0, \'2018-04-06 01:00:00\'),' +
                '(3, 1, 35.67349400, -110.32698600, 1, 1, \'2018-04-06 02:00:00\'),' +
                '(4, 2, 35.67349400, -115.32698600, 1, 0, \'2018-04-06 00:00:00\'),' +
                '(5, 2, 35.67349400, -113.32698600, 1, 0, \'2018-04-06 01:00:00\'),' +
                '(6, 2, 35.67349400, -111.32698600, 1, 1, \'2018-04-06 02:00:00\');'
                , function (error, rows) {
                    console.log("\n\n - - - shared before - - - \n\n");

                    request.get('/rest/trackerNode')
                        .end(function (err, res) {
                            //console.log(res.body);
                            expect(res.status).to.equal(200)
                            expect(res.body).to.have.lengthOf(6);
                            done(err);
                        });

                });
        });

        it('returns a list of tracker nodes', function (done) {
            console.log("\n\n - - - returns a list of users - - - \n\n");
            request.get('/rest/trackerNode')
                .end(function (err, res) {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.have.lengthOf(6);
                    done(err);
                });
        });

        it('returns tracker node 1', function (done) {
            request.get('/rest/trackerNode/3')
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.lengthOf(1);
                    expect(res.body[0].tool_id_fk).to.equal(1);
                    done(err);
                });
        });

        it('returns tracker nodes for tool 2', function (done) {
            request.get('/rest/trackerNode/tool/2')
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.lengthOf(3);
                    expect(res.body[0].tool_id_fk).to.equal(2);
                    done(err);
                });
        });

        it('returns tracker nodes for nonexistent tool', function (done) {
            request.get('/rest/trackerNode/tool/4')
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.lengthOf(0);
                    done(err);
                });
        });

        it('returns no tracker node for out of bounds id', function (done) {
            request.get('/rest/trackerNode/7')
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.lengthOf(0);
                    done(err);
                });
        });

        it('returns no tracker node for incorrect id regex', function (done) {
            request.get('/rest/trackerNode/g')
                .end(function (err, res) {
                    expect(res.status).to.equal(404);
                    done(err);
                });
        });

        it('returns tracker nodes for bad tool regex', function (done) {
            request.get('/rest/trackerNode/tool/hhh')
                .end(function (err, res) {
                    expect(res.status).to.equal(404);
                    done(err);
                });
        });

        it('returns latest tracker nodes for tool 2', function (done) {
            request.get('/rest/trackerNode/tool/last/2')
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.lengthOf(1);
                    let trackerNodeGet = res.body[0];

                    request.get('/rest/trackerNode/6')
                        .end(function (err, res) {
                            expect(trackerNodeGet).to.deep.equal(res.body[0]);
                            done(err);
                        });


                });
        });

        it('returns no tool for last that does not exist', function (done) {
            request.get('/rest/trackerNode/tool/last/8')
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.lengthOf(0);
                    done()
                });
        });

        it('returns no tool for last that does not match regex', function (done) {
            request.get('/rest/trackerNode/tool/last/fkkk')
                .end(function (err, res) {
                    expect(res.status).to.equal(404);
                    done()
                });
        });

    });
});