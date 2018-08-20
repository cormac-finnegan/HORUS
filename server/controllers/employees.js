var employeeModel = require('../models/employees.js');
module.exports = function (app) {


    app.get("/rest/employees", function (req, res) {
        console.log('Controller');
        employeeModel.getAllEmployees(function (callback) {

            /*var test = JSON.parse(JSON.stringify(callback.results))

            console.log(test)*/

            //console.log(JSON.stringify(callback.results))

            if (callback.error === null) {
                res.status(200).send(callback.results);
                //return callback.results;
            } else {

                res.status(404).send(callback.error);
            }
        });


    });

    app.get("/rest/employees/:id(\\d+*)", function (req, res) {
        console.log('Controller');
        let id = req.params.id;
        employeeModel.getEmployeeByID(id, function (callback) {

            /*var test = JSON.parse(JSON.stringify(callback.results))

            console.log(test)*/

            //console.log(JSON.stringify(callback.results))

            if (callback.error === null) {
                res.status(200).send(callback.results);
                //return callback.results;
            } else {

                res.status(404).send(callback.error);
            }
        });
    });


    app.get("/rest/employees/user/:id(\\d+*)", function (req, res) {
        console.log('Controller');
        let id = req.params.id;
        employeeModel.getEmployeeByUserID(id, function (callback) {

            /*var test = JSON.parse(JSON.stringify(callback.results))

            console.log(test)*/

            //console.log(JSON.stringify(callback.results))

            if (callback.error === null) {
                res.status(200).send(callback.results);
                //return callback.results;
            } else {

                res.status(404).send(callback.error);
            }
        });
    });
};

exports.addEmployee = function (employee, password, type, callback) {
    let employeeObject = JSON.parse(employee);
    let newPassword = password;
    let userType = type;

    /*    exports.getUserExistsByUsername(JSON.parse(user).username,  function (callback){

            if(callback.results === true){
                console.log('ERROR: User already Exists')
                message = {
                    error: "User Already Exists ",
                    results: null
                };
            }else{
            }
        });*/

    db.query('SELECT * FROM User_Type WHERE type = \'' + userType + '\';', function (error, results) {
        //console.log(sql);
        var typeId = JSON.stringify(results[0]);
        typeId = JSON.parse(typeId).id;

        console.log("!!!!!!!!!!!!!!!!!!ID: " + JSON.parse(typeId).id);

        let message = {
            error: undefined,
            results: undefined
        };
        if (error) {
            console.log(error);
            message = {
                error: error,
                results: null
            };
        } else {
            if (employeeObject.password.length <= 4) {
                message = {
                    error: 'Password too short, must be greater that 5 characters',
                    results: null
                };
            }
            //Add a new user derived from the passed info first so that
            db.query('INSERT INTO User (type, username, password, loggedin, last_login) VALUES (' +
                '\'' + typeId + '\',' +
                '\'' + employeeObject.email + '\',' +
                '\'' + newPassword + '\',' +
                '0,' +
                'NULL);', function (error, results) {
                //console.log(sql);
                if (error) {
                    console.log(error);
                    message = {
                        error: error,
                        results: null
                    };
                } else {
                    console.log(results);
                    message = {
                        error: null,
                        results: results
                    };
                }
                callback(message);
            });
        }

    });
};