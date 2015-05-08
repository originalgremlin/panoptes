var async = require('async'),
    Elasticsearch = require('elasticsearch'),
    exec = require('child_process').exec,
    express = require('express'),
    fs = require('fs'),
    path = require('path'),
    multer  = require('multer'),
    textRe = /^\d+:\s+(.*)$/;
    util = require('util'),
    app = express(),
    client = new Elasticsearch.Client({ host: 'http://localhost:19200' });

app.use(express.static('assets'));
app.use(multer({ dest: '/tmp/uploads/'}));

app.post('/upload', function (req, res) {
    var audio = req.files.audio.path,
        video = req.files.video.path,
        date = req.body.date,
        output = path.join(process.env.HOME, 'Downloads/panoptes', req.body.filename + '.webm');
    var commands = [
        util.format('ffmpeg -f wav -i "%s" -f webm -i "%s" -map 0:0 -map 1:0 "%s"', audio, video, output),
        util.format('pocketsphinx_continuous -infile %s', audio)
    ];
    async.map(
        commands,
        function (command, callback) {
            exec(command, function (err, stdout, stderr) {
                callback(err, stdout);
            });
        },
        function (err, results) {
            if (err) {
                res.status(500).send(err.message);
            } else {
                var text = results[1].trim()
                    .split('\n')
                    .map(function (line) { var match = textRe.exec(line); return match ? match[1] : ''; })
                    .join(' ');
                client.create({
                    index: 'aerofs',
                    type: 'video-chat',
                    id: output,
                    body: {
                        text: text,
                        createdAt: date,
                        path: output,
                        size: fs.statSync(output).size
                    }
                }, function (err, response) {
                    if (err) {
                        res.status(500).send(err.message);
                    } else {
                        fs.unlink(audio);
                        fs.unlink(video);
                        res.status(200).send(output);
                    }
                });
            }
        }
    );
});

var server = app.listen(13000);