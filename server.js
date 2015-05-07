var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    multer  = require('multer'),
    app = express();

app.use(multer({ dest: '/tmp/uploads/'}));

app.post('/upload', function (req, res) {
    var from = req.files.file.path,
        to = path.join(process.env.HOME, 'Downloads/panoptes', req.body.filename);
    fs.rename(from, to, function (err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send('OK');
        }
    });
});

var server = app.listen(13000);