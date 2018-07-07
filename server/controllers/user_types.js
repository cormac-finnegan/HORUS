var db = require('../db.js');

exports.add = function(userId, text, done) {
    var values = [userId, text];

    db.get().query('INSERT INTO User_Type (id, type) VALUES(?, ?)', values, function(err, result) {
        if (err) {
            return done(err);
        }
        done(null, result.insertId)
    })
};



exports.getAll = function(done) {
    db.get().query('SELECT * FROM User_Type', function (err, rows) {
        if (err) {
            return done(err);
        }
        done(null, rows)
    })
};

exports.getAllByUser = function(typeId, done) {
    db.get().query('SELECT * FROM User_Type WHERE id = ?', typeId, function (err, rows) {
        if (err) {
            return done(err);
        }
        done(null, rows)
    })
};