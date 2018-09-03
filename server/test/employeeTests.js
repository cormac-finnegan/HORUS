var assert = require('assert');
let db = require('../db');


var supertest = require('supertest');
var chai = require('chai');
var app = require('../app.js');
global.app = app;

global.expect = chai.expect;
global.request = supertest(app);

class Employee {
}

suite('GET Employees', function () {

    // In this test it's expected a task list of two tasks
    describe('Employees', function () {

        it('delete database', function (done) {
                db.query('DELETE FROM Employee;', function (error, rows) {
                    console.log('D E L E T E');
                    db.query('DELETE FROM User;', function (error, rows) {
                        console.log('D E L E T E');
                        done()
                    });
                });
        });

        it('populate database', function (done) {

            db.query('INSERT INTO User(id,type,username,password,loggedin,last_login) VALUES ' +
                '(1, 3, \'employee_test\', \'employee_test_pass\', 0, 0),' +
                '(2, 2, \'sar_test\', \'sar_test_pass\', 0, 0),' +
                '(3, 3, \'npr_test\', \'npr_test_pass\', 0, 0),' +
                '(4, 4, \'visitor_test\', \'visitor_test_pass\', 0, 0);'
                , function (error, rows) {

                    console.log(error);
                    let emp = new Employee();
                    emp.first_name = "\'Admin\'";
                    emp.last_name = "\'Name\'";
                    emp.dob = '\'1994-04-06 00:00:00\'';
                    emp.contact_number = '\'0870957701\'';
                    emp.walkie_talkie_channel = 4;
                    emp.hire_date = '\'0000-00-00 00:00:00\'';
                    emp.email = '\'admin@test.com\'';
                    emp.user_ref = 1;

                    db.query('INSERT INTO Employee(first_name, last_name, dob, contact_number, walkie_talkie_channel, hire_date, email, user_ref) VALUES ' +
                        '(' + emp.first_name + ',' + emp.last_name + ',' + emp.dob + ',' + emp.contact_number + ',' + emp.walkie_talkie_channel + ',' + emp.hire_date + ',' + emp.email + ',' + emp.user_ref + ')' +
                        ';'
                        , function (error, rows) {
                            console.log("\n\n - - - shared before - - - \n\n");

                            console.log(error)

                            request.get('/rest/employees')
                                .end(function (err, res) {
                                    //console.log(res.body);
                                    expect(res.status).to.equal(200)
                                    expect(res.body).to.have.lengthOf(1);
                                    done(err);
                                });
                        });

                });
        });


        it('returns a list of employees', function (done) {
            request.get('/rest/employees')
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.status).to.equal(200)
                    expect(res.body).to.have.lengthOf(1);
                    done(err);
                });
        });


        let id = null;
        let employee = {}

        it('get employee by user id', function (done) {
            request.get('/rest/employees/users/id/1')
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.status).to.equal(200)
                    expect(res.body).to.have.lengthOf(1);
                    id = res.body[0].id;
                    employee = res.body[0]
                    done(err);
                });
        });


        it('get employee by non-existent user id', function (done) {
            request.get('/rest/employees/users/id/6')
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.status).to.equal(200)
                    expect(res.body).to.have.lengthOf(0);
                    done(err);
                });
        });

        it('get employee by bad regex user id', function (done) {
            request.get('/rest/employees/users/id/g4')
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.status).to.equal(404)
                    done(err);
                });
        });


        it('get employee by id', function (done) {
            request.get('/rest/employees/'+id)
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.status).to.equal(200)
                    expect(res.body).to.have.lengthOf(1);
                    expect(employee).to.deep.equal(res.body[0]);

                    done(err);
                });
        });

        it('get employee by non-existent id', function (done) {
            request.get('/rest/employees/2')
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.status).to.equal(200)
                    expect(res.body).to.have.lengthOf(0);
                    done(err);
                });
        });

        it('get employee by bad regex id', function (done) {
            request.get('/rest/employees/g4')
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.status).to.equal(404)
                    done(err);
                });
        });

        it('delete employee', function (done) {
            request.delete('/rest/employees/'+id)
                .end(function (err, res) {
                    request.get('/rest/employees/'+id)
                        .end(function (err, res) {
                            //console.log(res.body);
                            expect(res.status).to.equal(200)
                            expect(res.body).to.have.lengthOf(0);

                            done(err);
                        });
                });
        });

        it('ensure delete employee deletes user automatically', function (done) {
            request.delete('/rest/employees/'+id)
                .end(function (err, res) {
                    request.get('/rest/users')
                        .end(function (err, res) {
                            //console.log(res.body);
                            expect(res.status).to.equal(200)
                            expect(res.body).to.have.lengthOf(3);

                            done(err);
                        });
                });
        });


        it('add new employee', function (done) {

            let emp = new Employee();
            emp.first_name = "Admin2";
            emp.last_name = "Name2";
            emp.dob = '1994-04-06 00:00:00';
            emp.contact_number = '0870957701';
            emp.walkie_talkie_channel = 4;
            emp.hire_date = '0000-00-00 00:00:00';
            emp.email = 'admin@test.com';
            emp.user_ref = null;

            request.get('/rest/employees')
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.status).to.equal(200)
                    expect(res.body).to.have.lengthOf(0);

                    request
                        .post('/rest/employees')
                        .set("Connection", "keep alive")
                        .send({
                            "first_name": "Admin2",
                            "last_name": "Name2",
                            "dob": "1994-04-06 00:00:00",
                            "contact_number":  "0870957701",
                            "walkie_talkie_channel": 4,
                            "hire_date": "0000-00-00 00:00:00",
                            "email": "admin@test.com",
                            "user_ref": 2
                        })
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .end(function(err, res){
                            expect(res.status).to.equal(200)
                            expect(res.body.insertId).to.not.equal(null)
                            done()
                        })
                });
        });


        it('modify an existing employee', function (done) {
            request.get('/rest/employees/' + (id+1))
                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.status).to.equal(200)
                    expect(res.body).to.have.lengthOf(1);
                    console.log('Existing User' + JSON.stringify(res.body))

                    request
                        .put('/rest/employees/' + (id+1))
                        .set("Connection", "keep alive")
                        .send({
                            "first_name": "Admin3",
                            "last_name": "Name3",
                            "dob": "1994-04-06 00:00:00",
                            "contact_number":  "0870957701",
                            "walkie_talkie_channel": 16,
                            "hire_date": "0000-00-00 00:00:00",
                            "email": "admin@test.com",
                            "user_ref": 2
                        })
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .end(function(err, res){
                            expect(res.status).to.equal(200)
                            expect(res.body.insertId).to.not.equal(null)
                            expect(res.body.affectedRows).to.equal(1)
                            done()
                        })
                });
        });

    });

});






