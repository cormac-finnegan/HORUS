var userModel = require('../models/users.js');
module.exports = function (app) {

    app.get("/rest/users", function (req, res) {

        userModel.getAllUsers(function (callback) {

            /*var test = JSON.parse(JSON.stringify(callback.results))

            console.log(test)*/

            //console.log(JSON.stringify(callback.results))

            if (callback.error === null) {
                res.status(200).send(callback.results);
                //return callback.results;
            } else {
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.get("/rest/users/search/:username([A-Za-z0-9@.#_-]{4,32})", function (req, res) {
        let username = req.params.username;
        userModel.getUserExistsByUsername(username, function (callback) {
            if (callback.error === null) {
                res.status(200).send(callback.results);
            } else {
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.get("/rest/users/:id(\\d+)", function (req, res) {
        let id = req.params.id;

        console.log("Passed ID: " + id)

        userModel.getUserByID(id, function (callback) {

            if (callback.error === null) {
                res.status(200).send(callback.results);
            } else {
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.post("/rest/users", function (req, res) {
        let newUser = req.body;

        userModel.addUser(JSON.stringify(newUser), function (callback) {
            if (callback.error === null) {
                res.status(200).send(callback.results);
            } else {
                console.log("Controller Error Msg: " + JSON.stringify(callback))
                if(callback.error.errno === 1062){
                    res.status(409).send(callback.error);
                }else if(callback.error.errno === 1101){
                    res.status(406).send(callback.error);
                }else{
                    res.status(404).send(callback.error);
                }

            }
        });

        //res.status(200).send(newUser);
    });

    app.delete("/rest/users/:id(\\d+)", function (req, res) {
        let id = req.params.id;

        userModel.deleteUserByID(id, function (callback) {

            if (callback.error === null && callback.results.affectedRows === 1) {
                res.status(200).send(callback.results);
            } else {
                res.status(404).send("User not in database");
            }
        });

        //res.status(200).send(newUser);
    });


    app.get("/rest/users/employees", function (req, res) {
        console.log('Controller')
        userModel.getAllEmployees(function (callback) {

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

    app.put("/rest/users/:id(\\d+)", function (req, res) {
        let id = req.params.id;
        let newUser = JSON.stringify(req.body);

        userModel.modifyUser(id, newUser, function (callback) {

            if (callback.error === null) {
                res.status(200).send(callback.results);
                //return callback.results;
            } else {

                res.status(404).send(callback.error);
            }
        });




    });

};