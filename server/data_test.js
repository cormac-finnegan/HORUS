var data = {
    tables: {
        User_Type: [
            {id: 0, type: "ADMIN"},
            {id: 1, type: "SAR"}
        ],
    },
};

var db = require('./db');
db.connect(db.MODE_TEST, function() {

    db.fixtures(data, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('Data has been loaded...')
    })
});


