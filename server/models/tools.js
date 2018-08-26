var db = require('../db');

// Get by ID
exports.getToolByID = function (id, callback) {
    //console.log('ID: ' + id);
    db.query('SELECT * FROM Tool_Inventory where id = ' + id + ';', function (error, results) {

        //console.log(this.sql);
        var message = {
            error: undefined,
            results: undefined
        };
        if (error) {
            //console.log(error);
            message = {
                error: error,
                results: null
            };
        } else {
            //console.log(results);
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });
};

// Get all user types
exports.getAllTools = function (callback) {
    console.log("Get Tools (Model)")
    db.query('SELECT * FROM Tool_Inventory;', function (error, results, sql) {
        console.log(sql);
        var message = {
            error: undefined,
            results: undefined
        };
        if (error) {
            //console.log(error);
            message = {
                error: error,
                results: null
            };
        } else {
            //console.log(results);
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });
};


// Add a new user type
exports.addTool = function (Tool, callback) {

    let jsonObject = JSON.parse(Tool);

    db.query('INSERT INTO Tool_Inventory (id,type,description,status,induction_date,MISC) VALUES (\'' + jsonObject.id + '\', \'' + jsonObject.type + '\', \'' + jsonObject.description + '\', \'' + jsonObject.status + '\', \'' + jsonObject.induction_date + '\', \'' + jsonObject.MISC + '\' );', function (error, results) {
        //console.log(sql);
        var message = {
            error: undefined,
            results: undefined
        };
        if (error) {
            //console.log(error);
            message = {
                error: error,
                results: null
            };
        } else {
            //console.log(results);
            message = {
                error: null,
                results: results
            };
        }
        
        callback(message);
    });
};


// delete a Tool by ID
exports.deleteToolByID = function (id, callback) {
    //console.log('ID: ' + id);
    db.query('DELETE FROM Tool_Inventory where id = ' + id + ';', function (error, results) {

        //console.log(this.sql);
        var message = {
            error: undefined,
            results: undefined
        };
        if (error) {
            //console.log(error);
            message = {
                error: error,
                results: null
            };
        } else {
            //console.log(results);
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });
};

exports.modifyTool = function (id, tool, callback) {
    //console.log('ID: ' + id);
    let newTool = tool;

    db.query('UPDATE Tool_Inventory '+
        'SET ' +
        'type = \'' + newTool.type + '\', ' +
        'description = \'' + newTool.description + '\', ' +
        'status = ' + newTool.status + ', ' +
        'induction_date = \'' + newTool.induction_date + '\', ' +
        'MISC = \'' + newTool.MISC + '\' ' +
        ' where id = ' + id + ';', function (error, results) {
        //console.log(this.sql);
        var message = {
            error: undefined,
            results: undefined
        };
        if (error) {
            //console.log(error);
            message = {
                error: error,
                results: null
            };
        } else {
            //console.log(results);
            message = {
                error: null,
                results: newTool
            };
        }
        callback(message);
    });
};