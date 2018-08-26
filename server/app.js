let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = process.env.PORT || 3000;

let supertest = require('supertest');

let router = express.Router();
let trackerNodes = require("./controllers/trackerNodes.js");
let home = require("./controllers/home.js");
let userTypes = require("./controllers/userTypes.js");
let tools = require("./controllers/tools.js");
let authentication = require("./controllers/auth.js");
let users = require("./controllers/users.js");
let employees = require("./controllers/employees.js");
let visitors = require("./controllers/visitors.js");


global.request = supertest(app);

global.BASE_PATH = "/horus";

let path = require('path');
global.appRoot = path.resolve(__dirname);

global.projRoot = path.resolve(__dirname + '/..');

console.log('\nProject Root: ' + projRoot)

AWS_DB = require(appRoot + '/AWS_db');
LOCAL_DB = require(appRoot + '/local_db');

module.exports = {appRoot: appRoot};
module.exports = {DB: AWS_DB};

app.set('views', __dirname + '/views'); // general config
app.set('view engine', 'html');
app.get('/404', function (req, res, next) {
    next();// trigger a 404 since no other middleware will match /404 after this one, and we're not responding here
});
app.get('/403', function (req, res, next) {// trigger a 403 error
    let err = new Error('not allowed!');
    err.status = 403;
    next(err);
});
app.get('/500', function (req, res, next) {// trigger a generic (500) error
    next(new Error('keyboard cat!'));
});

//Angular static path
app.use(express.static(path.join(__dirname + 'client')));


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(require('./controllers'));

/**********************************************************************************************************************/

router.use(function (req, res, next) {
    console.log("/" + req.method + ": res " + res);
    //res.header("Content-Type",'application/json');
    next();
});


/*app.get('*', function(req,res){
    res.sendFile(projRoot, '/public/index.html');
});*/


app.use("/", router);

/**********************************************************************************************************************/

home(app);
userTypes(app);
tools(app);
trackerNodes(app);
users(app);
authentication(app);
employees(app);
visitors(app)


let server = app.listen(3000, function () {
    console.log('Listening on port ' + server.address().port)
});

module.exports = server;
