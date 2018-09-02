import {Employee} from "../../client/src/app/_models";

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


            let emp = new Employee({
                first_name:"Admin",
                last_name:"Name",
                dob: '0000-00-00 00:00:00',
                contact_number: '087-095-7701',
                walkie_talkie_channel: 4,
                hire_date: '0000-00-00 00:00:00',
                email: '0000-00-00 00:00:00',
                user_ref:1
            });

            db.query('INSERT INTO Employee(first_name, last_name, dob, contact_number, walkie_talkie_channel, hire_date, email, user_ref) VALUES ' +
                '('+emp.first_name+','+ emp.last_name +','+ emp.dob+','+emp.contact_number+','+emp.walkie_talkie_channel+','+emp.hire_date+','+emp.email+','+emp.user_ref+ '),' +
                ');'
                , function (error, rows) {
                    console.log("\n\n - - - shared before - - - \n\n");
                    done()

                });
        });




    });

});






