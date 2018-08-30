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

    app.get("/rest/visitors/:id(\\d+)", function (req, res) {
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

    app.put("/rest/visitors/:id(\\d+)", function (req, res) {

        let id = req.params.id;
        let visitor = req.body;

        visitorModel.editVisitor(id, visitor, function (callback) {

            if (callback.error === null) {
                res.status(200).send(callback.results);
                //return callback.results;
            } else {

                res.status(404).send(callback.error);
            }
        });
    });

    app.put("/rest/visitors/:visitorID(\\d+)/tracker/:trackerID(\\d+)", function (req, res) {

        console.log(JSON.stringify(req.params));

        let visitorID = req.params.visitorID;
        let trackerID = req.params.trackerID;
        //let visitor = req.body;

        visitorModel.assignTracker(visitorID, trackerID, function (callback) {

            if (callback.error === null) {
                res.status(200).send(callback.results);
                //return callback.results;
            } else {

                res.status(404).send(callback.error);
            }
        });
    });

    app.delete("/rest/visitors/:visitorID(\\d+)/tracker/:trackerID(\\d+)", function (req, res) {

        console.log(JSON.stringify(req.params));

        let visitorID = req.params.visitorID;
        let trackerID = req.params.trackerID;

        visitorModel.deleteTracker(visitorID, trackerID, function (callback) {

            if (callback.error === null) {
                res.status(200).send(callback.results);
                //return callback.results;
            } else {

                res.status(404).send(callback.error);
            }
        });
    });

};