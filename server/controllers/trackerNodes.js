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

    app.get("/rest/trackerNode/:id", function(req, res) {
        let id = req.params.id;

        trackerNodeModel.getTrackerNodeByID(id, function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.get("/rest/trackerNode/tool/:id", function(req, res) {
        let id = req.params.id;

        trackerNodeModel.getTrackerNodeByToolID(id, function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.get("/rest/trackerNode/tool/last/:id", function(req, res) {
        let id = req.params.id;

        trackerNodeModel.getLatestTrackerNodeByToolID(id, function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);
            }
        });
    });

    app.post("/rest/trackerNode", function(req, res) {
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

    app.delete("/rest/trackerNode/:id", function(req, res) {
        let id = req.params.id;

        trackerNodeModel.deleteTrackerNodeByID(id, function(callback) {

            if(callback.error === null){
                res.status(200).send(callback.results);
            }else{
                res.status(404).send(callback.error.code);

            }
        });

    });

    app.put("/rest/trackerNode/:id", function (req, res) {
        let id = req.params.id;
        let newTracker = req.body;
        newTracker = JSON.stringify(newTracker);
        newTracker = JSON.parse(newTracker);

        trackerNodeModel.modifyTracker(id, newTracker, function (callback) {
            console.log("\n\n"+newTracker.id)
            if (callback.error === null) {
                res.status(200).send(callback.results);
                //console.log(JSON.stringify(callback.results))
            } else {
                res.status(404).send(callback.error);
            }
        });

        //res.status(200).send(newTool);
    });

    // home page
    app.get(BASE_PATH+'/tracker', function (req, res, next) {


        res.sendFile('/public/tracking.html', { root : projRoot});


        //

    });

};
