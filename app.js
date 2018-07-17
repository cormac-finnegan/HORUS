var express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , port = process.env.PORT || 3000;
var router = express.Router();
var trackerNodes = require("./controllers/trackerNodes.js");
var home = require("./controllers/home.js");
var userTypes = require("./controllers/userTypes.js");
var tools = require("./controllers/tools.js");

const BASE_PATH = "/horus";

var path = require('path');
global.appRoot = path.resolve(__dirname);
AWS_DB = require(appRoot + '\\AWS_db');
LOCAL_DB = require(appRoot + '\\local_db');

module.exports = {appRoot : appRoot};
module.exports = {DB : AWS_DB};

app.set('views', __dirname + '/views'); // general config
app.set('view engine', 'html');
app.get('/404', function(req, res, next){
    next();// trigger a 404 since no other middleware will match /404 after this one, and we're not responding here
});
app.get('/403', function(req, res, next){// trigger a 403 error
    var err = new Error('not allowed!');
    err.status = 403;
    next(err);
});
app.get('/500', function(req, res, next){// trigger a generic (500) error
    next(new Error('keyboard cat!'));
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(require('./controllers'));

/**********************************************************************************************************************/

router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
});



app.use("/",router);

/**********************************************************************************************************************/

home(BASE_PATH, app);
userTypes(BASE_PATH, app);
tools(BASE_PATH, app);
trackerNodes(BASE_PATH, app);




var server = app.listen(3000, function() {
    console.log('Listening on port ' + server.address().port)
});