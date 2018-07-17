var db = require('../db')

// Get by ID
exports.getToolByID = function(id, callback) {
    console.log('ID: ' + id);
    db.query('SELECT * FROM Tool_Inventory where id = ' + id + ';', function (error, results) {

        //console.log(this.sql);
        var message = {
            error: undefined,
            results: undefined
        };
        if(error){
            console.log(error);
            message = {
                error: error,
                results: null
            };
        }else{
            console.log(results);
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });
};

// Get all user types
exports.getAllTools = function(callback) {

    db.query('SELECT * FROM Tool_Inventory;', function (error, results, sql) {
        //console.log(sql);
        var message = {
            error: undefined,
            results: undefined
        };
        if(error){
            console.log(error);
            message = {
                error: error,
                results: null
            };
        }else{
            console.log(results);
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });
};


// Add a new user type
exports.addTool = function(Tool, callback) {

    let jsonObject = JSON.parse(Tool);

    console.log(jsonObject.Tool_Inventory.type);

    db.query('INSERT INTO Tool_Inventory (id,type,description,status,induction_date,MISC) VALUES (null, \''+jsonObject.Tool_Inventory.type+'\');', function (error, results) {
        //console.log(sql);
        var message = {
            error: undefined,
            results: undefined
        };
        if(error){
            console.log(error);
            message = {
                error: error,
                results: null
            };
        }else{
            console.log(results);
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });
};


// delete a Tool by ID
exports.deleteToolByID = function(id, callback) {
    console.log('ID: ' + id);
    db.query('DELETE FROM Tool_Inventory where id = ' + id + ';', function (error, results) {

        //console.log(this.sql);
        var message = {
            error: undefined,
            results: undefined
        };
        if(error){
            console.log(error);
            message = {
                error: error,
                results: null
            };
        }else{
            console.log(results);
            message = {
                error: null,
                results: results
            };
        }
        callback(message);
    });
};
