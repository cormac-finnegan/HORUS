var express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , port = process.env.PORT || 3000;
var http = require('http');
var routes = require("./controllers/routes.js");

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

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(require('./controllers'))
var wiki = require('./controllers/wiki');
app.use('/wiki', wiki);

routes(app);

var server = app.listen(3000, function() {
    console.log('Listening on port ' + server.address().port)
});