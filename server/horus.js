var db = require('./db');
var express = require("express");
var horus = express();

horus.use('/user_types', require('./controllers/user_types'));
//horus.use('/users', require('./controllers/users'));

// Connect to MySQL on start
db.connect(db.MODE_PRODUCTION, function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
        process.exit(1)
    } else {
        horus.listen(3000, function() {
            console.log('Listening on port 3000...')
        })
    }
});