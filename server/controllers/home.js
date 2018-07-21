module.exports = function (app) {

    // home page
    app.use(BASE_PATH, function (req, res, next) {
        //res.send('Hello World');
        console.log('Horus');
        next()
        //res.sendFile(appRoot + '/views/index.html');

        //

    });

    // home page
    app.get(BASE_PATH, function (req, res, next) {
        //res.send('Hello World');
        console.log('Horus');

        res.sendFile(appRoot + '/views/index.html');

        //

    });
};