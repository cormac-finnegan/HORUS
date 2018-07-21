var userTypeModel = require('../models/userTypes.js');
module.exports = function (app) {

    app.get(BASE_PATH + "/userTypes", function (req, res) {

        userTypeModel.getAllUserTypes(function (callback) {

            if (callback.error === null) {
                res.status(200).send(callback.results);
            } else {
                res.status(404).send(callback.error.code);
            }
        });


    });

    app.get(BASE_PATH + "/userTypes/:id", function (req, res) {
        let id = req.params.id;

        userTypeModel.getUserTypeByID(id, function (callback) {

            if (callback.error === null) {
                res.status(200).send(callback.results);
            } else {
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.post(BASE_PATH + "/userTypes", function (req, res) {
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

    app.delete(BASE_PATH + "/userTypes/:id", function (req, res) {
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
}