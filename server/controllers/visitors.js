var visitorModel = require('../models/visitors.js');


module.exports = function (app) {
    app.get("/rest/visitors", function (req, res) {

        visitorModel.getAllVisitors(function (callback) {

            if (callback.error === null) {
                res.status(200).send(callback.results);
            } else {
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.get("/rest/visitors/:id(\\d+*)", function (req, res) {
        let id = req.params.id;

        visitorModel.getVisitorByID(id, function (callback) {

            if (callback.error === null) {
                res.status(200).send(callback.results);
            } else {
                res.status(404).send(callback.error.code);
            }
        });
    });


    app.post("/rest/visitors", function (req, res) {
        let newVisitor = req.body;

        visitorModel.addVisitor(JSON.stringify(newVisitor), function (callback) {
            if (callback.error === null) {
                res.status(200).send(callback.results);
            } else {
                res.status(404).send(callback.error);
            }
        });
    });

};