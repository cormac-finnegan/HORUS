var userTypeModel = require('../models/userTypes.js');
module.exports = function (app) {

    app.get("/rest/userTypes", function (req, res) {

        userTypeModel.getAllUserTypes(function (callback) {

            /*var test = JSON.parse(JSON.stringify(callback.results))

            console.log(test)*/

            console.log(JSON.stringify(callback.results))

            if (callback.error === null) {
                res.send(JSON.stringify(callback.results));
                //return calhlback.results;
            } else {
                res.status(404).send(callback.error.code);
            }
        });


    });

    app.get("/rest/userTypes/:id", function (req, res) {
        let id = req.params.id;

        userTypeModel.getUserTypeByID(id, function (callback) {

            if (callback.error === null) {
                res.status(200).send(callback.results);
            } else {
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.post("/rest/userTypes", function (req, res) {
        let newUser = req.body;

        userTypeModel.addUserType(JSON.stringify(newUser), function (callback) {

            if (callback.error === null) {
                res.status(200).send(callback.results);
            } else {
                res.status(404).send(callback.error.code);
            }
        });

        //res.status(200).send(newUser);
    });

    app.delete("/rest/userTypes/:id", function (req, res) {
        let id = req.params.id;

        userTypeModel.deleteUserTypeByID(id, function (callback) {

            if (callback.error === null) {
                res.status(200).send(callback.results);
            } else {
                res.status(404).send(callback.error.code);
            }
        });

        //res.status(200).send(newUser);
    });

    // home page
    app.get(BASE_PATH+'/userTypes', function (req, res, next) {
        //res.send('Hello World');
        console.log('Horus: ' + projRoot + '/public/index.html');

        res.sendFile('/public/index.html', { root : projRoot});


        //

    });

}