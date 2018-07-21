var trackerNodeModel = require('../models/trackerNodes.js');

module.exports = function (app) {

    app.get(BASE_PATH + "/trackerNode", function(req, res) {

        trackerNodeModel.getAllTrackerNodes(function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.get(BASE_PATH + "/trackerNode/:id", function(req, res) {
        let id = req.params.id;

        trackerNodeModel.getTrackerNodeByID(id, function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.get(BASE_PATH + "/trackerNode/tool/:id", function(req, res) {
        let id = req.params.id;

        trackerNodeModel.getTrackerNodeByToolID(id, function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.get(BASE_PATH + "/trackerNode/tool/last/:id", function(req, res) {
        let id = req.params.id;

        trackerNodeModel.getLatestTrackerNodeByToolID(id, function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.post(BASE_PATH + "/trackerNode", function(req, res) {
        let newUser = req.body;

        trackerNodeModel.addTrackerNode(JSON.stringify(newUser), function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });

        //res.status(200).send(newUser);
    });

    app.delete(BASE_PATH + "/trackerNode/:id", function(req, res) {
        let id = req.params.id;

        trackerNodeModel.deleteTrackerNodeByID(id, function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);

            }
        });

        //res.status(200).send(newUser);
    });

};
