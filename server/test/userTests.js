var assert = require('assert');
let db = require('../db');


var supertest = require('supertest');
var chai = require('chai');
var app = require('../app.js');
global.app = app;

global.expect = chai.expect;
global.request = supertest(app);

suite('GET Users', function () {

    // In this test it's expected a task list of two tasks
    describe('Users', function () {

        it('delete database', function (done) {
            db.query('DELETE FROM User;', function (error, rows) {
                console.log('D E L E T E');
                done()
            });
        });

        it('populate database', function (done) {
            db.query('INSERT INTO User(id,type,username,password,loggedin,last_login) VALUES ' +
                '(1, 1, \'admin_test\', \'admin_test_pass\', 0, 0),' +
                '(2, 2, \'sar_test\', \'sar_test_pass\', 0, 0),' +
                '(3, 3, \'npr_test\', \'npr_test_pass\', 0, 0),' +
                '(4, 4, \'visitor_test\', \'visitor_test_pass\', 0, 0);'
                , function (error, rows) {
                    console.log("\n\n - - - shared before - - - \n\n");
                    done()

                });
        });


        it('returns a list of users', function (done) {
            console.log("\n\n - - - returns a list of users - - - \n\n");
            request.get('/rest/users')
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.status).to.equal(200)
                    expect(res.body).to.have.lengthOf(4);
                    done(err);
                });
        });

        it('ensure user types', function (done) {
            console.log("\n\n - - - ensure user types - - - \n\n");
            request.get('/rest/users')
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.status).to.equal(200);
                    expect(res.body[0].type).to.equal(1);
                    expect(res.body[1].type).to.equal(2);
                    expect(res.body[2].type).to.equal(3);
                    expect(res.body[3].type).to.equal(4);
                    done(err);
                });
        })


        it('get a user that doesn\'t exist', function (done) {
            request.get('/rest/users/101')
                .end(function (err, res) {
                    expect(res.body).to.have.length(0);
                    done()
                });
        });

        it('get a user with an invalid number', function (done) {
            request.get('/rest/users/g')
                .end(function (err, res) {
                    expect(res.status).to.equal(404)
                    done()
                });
        });

        it('get a user with a mixed number', function (done) {
            request.get('/rest/users/1g3')
                .end(function (err, res) {
                    expect(res.status).to.equal(404)
                    done()
                });
        });

        it('compare the JSON Object values returned match the database', function (done) {
            console.log("\n\n - - - compare the JSON Object values returned match the database - - - \n\n");
            request.get('/rest/users/1')
                .end(function (err, res) {
                    expect(res.status).to.equal(200)
                    var compareJSONString = JSON.stringify({
                        "id": 1,
                        "type": 1,
                        "username": "admin_test",
                        "password": "admin_test_pass",
                        "loggedin":  0,
                        "last_login": "0000-00-00 00:00:00"
                    });
                    var bodyString = JSON.stringify(res.body[0]);

                    var compareJSONObj = JSON.parse(compareJSONString);
                    var compareBodyObj = JSON.parse(bodyString);

                    expect(compareJSONObj).to.deep.equal(compareBodyObj);
                    done(err);
                });
        });

        it('deletes a user', function (done) {
            request.delete('/rest/users/3')
                .end(function (err, res) {
                    expect(res.status).to.equal(200)
                    request.get('/rest/users')
                        .end(function (err, res) {
                            expect(res.status).to.equal(200);
                            expect(res.body).to.have.lengthOf(3);
                            done(err);
                        });
                });
        });



        it('adds a new user', function (done) {
            console.log("\n\n - - - adds a new user - - - \n\n");
            request
                .post('/rest/users')
                .set("Connection", "keep alive")
                .send({
                        "id": 3,
                        "type": 3,
                        "username": "npr_test_2",
                        "password": "npr_test_pass_2",
                        "loggedin":  0,
                        "last_login": "0000-00-00 00:00:00"
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    request.get('/rest/users')
                        .end(function (err, res) {
                            expect(res.status).to.equal(200);
                            console.log(res.body);
                            expect(res.body).to.have.lengthOf(4);
                            done(err);
                        });
                });
        });

        it('adds a new user with an exisiting username', function (done) {
            console.log("\n\n - - - adds a new user with an exisiting username - - - \n\n");
            request
                .post('/rest/users')
                .set("Connection", "keep alive")
                .send({
                    "id": 3,
                    "type": 3,
                    "username": "npr_test_2",
                    "password": "npr_test_pass_2",
                    "loggedin":  0,
                    "last_login": "0000-00-00 00:00:00"
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    expect(res.status).to.equal(409);
                    done()
                });
        });

        it('adds a new user with a non-existent user type', function (done) {
            console.log("\n\n - - - adds a new user with a non-existent user type - - - \n\n");
            request
                .post('/rest/users')
                .set("Connection", "keep alive")
                .send({
                    "id": 3,
                    "type": 6,
                    "username": "npr_test_3",
                    "password": "npr_test_pass_3",
                    "loggedin":  0,
                    "last_login": "0000-00-00 00:00:00"
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    //console.log(JSON.stringify(res))
                    expect(res.status).to.equal(406);

                    done()
                });
        });

        it('attempts to add a malformed user JSON', function (done) {
            console.log("\n\n - - - adds a new user - - - \n\n");
            request
                .post('/rest/users')
                .set("Connection", "keep alive")
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    expect(res.status).to.equal(406)
                    done(err)
                });
        });

        it('checks size after new user', function (done) {
            request.get('/rest/users')
                .expect(200)
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.body).to.have.lengthOf(4);
                    done(err);
                });
        });


        it('modify\'s a user in the database', function (done) {
            console.log("\n\n - - - modify\'s a user in the database - - - \n\n");
            request
                .put('/rest/users/4')
                .set("Connection", "keep alive")
                .expect('Content-Type', /json/)
                .send({
                    "id": 4,
                    "type": 2,
                    "username": "sar_test_mod",
                    "password": "sar_test_pass_mod",
                    "loggedin":  0,
                    "last_login": "0000-00-00 00:00:00"
                })
                .end(function (err, res) {

                    request.get('/rest/users/4')
                        .expect(200)
                        .end(function (err, res) {
                            var compareJSONString = JSON.stringify({
                                "id": 4,
                                "type": 2,
                                "username": "sar_test_mod",
                                "password": "sar_test_pass_mod",
                                "loggedin":  0,
                                "last_login": "0000-00-00 00:00:00"
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


        it('deletes a user that doesn\'t exist', function (done) {
            request.delete('/rest/users/300')
                .end(function (err, res) {
                    expect(res.status).to.equal(404)
                    request.get('/rest/users')
                        .end(function (err, res) {
                            expect(res.status).to.equal(200);
                            expect(res.body).to.have.lengthOf(4);
                            done(err);
                        });
                });
        });

        it('deletes a user that doesn\'t exist (bad regex)', function (done) {
            request.delete('/rest/users/g')
                .end(function (err, res) {
                    expect(res.status).to.equal(404)
                    request.get('/rest/users')
                        .end(function (err, res) {
                            expect(res.status).to.equal(200);
                            expect(res.body).to.have.lengthOf(4);
                            done(err);
                        });
                });
        });

        it('get employees', function (done) {
            console.log("\n\n - - - ensure user types - - - \n\n");
            request.get('/rest/users/employees')
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.status).to.equal(200);
                    for(let i = 0; i < res.body.length; i++){
                        expect(res.body[i].type).to.equal(3);
                        console.log(res.body[i])
                    }

                    done(err);
                });
        })

        it('search username exists', function (done) {
            console.log("\n\n - - - ensure user types - - - \n\n");
            request.get('/rest/users/search/admin_test')
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.equal(true)

                    done(err);
                });
        })

        it('search username doesn\'t exist', function (done) {
            console.log("\n\n - - - ensure user types - - - \n\n");
            request.get('/rest/users/search/admin')
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.equal(false)

                    done(err);
                });
        })

    });
});


suite('Test the authentication sql', function () {

    // In this test it's expected a task list of two tasks
    describe('Authentication', function () {

        it('authenticate correct username and correct password', function (done) {
            request.post('/rest/auth/')
                .set("Connection", "keep alive")
                .send({

                    "username": "sar_test",
                    "password": "sar_test_pass",
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    expect(res.status).to.equal(200);

                    request.get('/rest/users/2')
                        .expect(200)
                        .end(function (err, res) {
                            expect(res.body[0].loggedin).to.equal(1);
                            done(err);
                        });

                });
        });

        it('authenticate correct username and incorrect password', function (done) {
            request.post('/rest/auth/')
                .set("Connection", "keep alive")
                .send({

                    "username": "npr_test_2",
                    "password": "wrong_pAssword",
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    expect(res.status).to.equal(409);
                    done()
                });
        });

        it('authenticate incorrect username', function (done) {
            request.post('/rest/auth/')
                .set("Connection", "keep alive")
                .send({

                    "username": "nomatch",
                    "password": "npr_test_pass_2",
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    expect(res.status).to.equal(404);
                    done()
                });
        });


    });

});






