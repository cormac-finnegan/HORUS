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

    app.get("/rest/employees/users/id/:id(\\d+*)", function (req, res) {
        console.log('Controller');
        let id = req.params.id;
        employeeModel.getEmployeeByUserID(id, function (callback) {

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

    app.post("/rest/employees", function (req, res) {
        console.log("New Employee")
        let newEmployee= req.body;
        employeeModel.addEmployee(JSON.stringify(newEmployee), function (callback) {

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

    app.delete("/rest/employees/:id(\\d+*)", function (req, res) {
        console.log("Delete Employee");
        let id = req.params.id;
        employeeModel.deleteEmployeeByID(id, function (callback) {

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


    app.put("/rest/employees/:id(\\d+*)", function (req, res) {

        let id = req.params.id;
        let employee = req.body;

        employeeModel.editEmployee(id, employee, function (callback) {

            if (callback.error === null) {
                res.status(200).send(callback.results);
                //return callback.results;
            } else {

                res.status(404).send(callback.error);
            }
        });
    });
};

