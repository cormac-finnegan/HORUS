var authModel = require('../models/auth.js');


module.exports = function (app) {

    app.post("/rest/auth/", function (req, res) {

        let user = req.body;
        let passwordIn = req.body.password;
        console.log('User: ' + JSON.stringify(user))

        authModel.getPasswordByUsername(user.username, function (callback) {

            if (callback.error === null) {
                if (JSON.parse(JSON.stringify(callback.results[0])).password === passwordIn) {
                    console.log("THEY MATCH!!")
                    let userLog = {};
                    authModel.loginUser(user.username, function(callback){
                        authModel.getUserByUsername(user.username, function (callback) {
                            //console.log("\nInside deep function: " + JSON.stringify(callback.results[0]));
                            userLog = callback.results[0];
                            //console.log("USerLog: " + JSON.stringify(userLog));
                            res.status(200).send(userLog);
                        });
                    });
                } else if (JSON.parse(JSON.stringify(callback.results[0])).password !== passwordIn) {
                    console.log("NO MATCH :(")
                    res.status(409).send("Incorrect Username or Password");
                } else {
                    res.status(404).send(callback.error);
                }
            } else {
                res.status(404).send(callback.error);
            }
        });
    });

}