// wiki.js - Wiki route module.

var express = require('express');
var router = express.Router();

// Home page route.
router.get('/wiki', function (req, res) {
    console.log('In wiki');
    res.send('<h1>Wiki home page</h1>');
});

// About page route.
router.get('/about', function (req, res) {
    res.send('About this wiki');
});

module.exports = router;