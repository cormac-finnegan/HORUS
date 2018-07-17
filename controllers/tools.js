var toolModel = require('../models/tools.js');


module.exports = function (BASE_PATH, app) {
    app.get(BASE_PATH + "/toolInventory", function(req, res) {

        toolModel.getAllTools(function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.get(BASE_PATH + "/toolInventory/:id", function(req, res) {
        let id = req.params.id;

        toolModel.getToolByID(id, function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.post(BASE_PATH + "/toolInventory", function(req, res) {
        let newUser = req.body;

        toolModel.addTool(JSON.stringify(newUser), function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });

        //res.status(200).send(newUser);
    });

    app.delete(BASE_PATH + "/toolInventory/:id", function(req, res) {
        let id = req.params.id;

        toolModel.deleteToolByID(id, function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);

            }
        });

        //res.status(200).send(newUser);
    });
};