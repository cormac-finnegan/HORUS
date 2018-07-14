var db = require('../db');
var express = require('express');
var app = express();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.sendFile('/views/index.html', { root: './' });
});

/* GET home page. */
router.get('/wiki', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.sendFile('views/index.html', { root: './' });
});

/* GET home page. */
router.get('/users', function(req, res, next) {

    var results = db.connection.query("SELECT * FROM User_Type", function (error, results, fields) {
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
        console.log(results);
    });

    //res.render('users', { title: 'Users' });
    res.sendfile('views/index.html');


});

module.exports = router;


