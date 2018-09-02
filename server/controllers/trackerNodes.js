var trackerNodeModel = require('../models/trackerNodes.js');

module.exports = function (app) {

    app.get("/rest/trackerNode", function(req, res) {

        trackerNodeModel.getAllTrackerNodes(function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.get("/rest/trackerNode/:id(\\d+)", function(req, res) {
        let id = req.params.id;

        trackerNodeModel.getTrackerNodeByID(id, function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.get("/rest/trackerNode/tool/:id(\\d+)", function(req, res) {
        let id = req.params.id;

        trackerNodeModel.getTrackerNodeByToolID(id, function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.get("/rest/trackerNode/tool/last/:id(\\d+)", function(req, res) {
        let id = req.params.id;

        trackerNodeModel.getLatestTrackerNodeByToolID(id, function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });
    });

    // home page
    app.get(BASE_PATH+'/tracker', function (req, res, next) {


        res.sendFile('/public/tracking.html', { root : projRoot});


        //

    });

};
