var toolModel = require('../models/tools.js');


module.exports = function (app) {
    app.get("/rest/toolInventory", function (req, res) {

        toolModel.getAllTools(function (callback) {

            if (callback.error === null) {
                res.status(200).send(callback.results);
            } else {
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.get("/rest/toolInventory/type=\'tracker\'", function (req, res) {

        toolModel.getAllTrackers(function (callback) {

            if (callback.error === null) {
                res.status(200).send(callback.results);
            } else {
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.get("/rest/toolInventory/:id(\\d+*)", function (req, res) {
        let id = req.params.id;

        toolModel.getToolByID(id, function (callback) {

            if (callback.error === null) {
                res.status(200).send(callback.results);
            } else {
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.post("/rest/toolInventory", function (req, res) {
        let newTool = req.body;
        newTool = JSON.stringify(newTool);

        toolModel.toolCount(function (callback) {
            var JSONObj = JSON.parse(newTool);
            JSONObj.id = callback.results.count + 1;
            newTool = JSON.stringify(JSONObj);

            toolModel.addTool(newTool, function (callback) {
                if (callback.error === null) {
                    res.status(200).send(callback.results);
                } else {
                    res.status(404).send(callback.error.code);
                }
            });
        });
    });

    app.delete("/rest/toolInventory/:id", function (req, res) {
        let id = req.params.id;

        toolModel.deleteToolByID(id, function (callback) {

            if (callback.error === null) {
                res.status(200).send(callback.results);
            } else {
                res.status(404).send(callback.error.code);

            }
        });

        //res.status(200).send(newTool);
    });

    app.put("/rest/toolInventory/:id", function (req, res) {
        let id = req.params.id;
        let newTool = req.body;
        newTool = JSON.stringify(newTool);
        newTool = JSON.parse(newTool);

        toolModel.modifyTool(id, newTool, function (callback) {
            if (callback.error === null) {
                res.status(200).send(callback.results);
                //console.log(JSON.stringify(callback.results))
            } else {
                res.status(404).send(callback.error.code);
            }
        });

        //res.status(200).send(newTool);
    });

    app.get("/rest/toolInventory/count", function (req, res) {

        toolModel.toolCount(function (callback) {
            if (callback.error === null) {
                res.status(200).send(callback.results);
            } else {
                res.status(404).send(callback.error.code);
            }
        });
    });
};