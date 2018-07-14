var userTypeModel = require('../models/userTypes.js');

var userTypes = function (app) {
    app.get("/userTypes", function(req, res) {

        userTypeModel.getAllUserTypes(function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.get("/userTypes/:id", function(req, res) {
        let id = req.params.id;

        userTypeModel.getUserTypeByID(id, function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.post("/userTypes", function(req, res) {
        let newUser = req.body;

        userTypeModel.addUserType(JSON.stringify(newUser), function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });

        //res.status(200).send(newUser);
    });

    app.delete("/userTypes/:id", function(req, res) {
        let id = req.params.id;

        userTypeModel.deleteUserTypeByID(id, function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });

        //res.status(200).send(newUser);
    });
};

module.exports = userTypes;


