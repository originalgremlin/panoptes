var exec = require('child_process').exec,
    express = require('express'),
    fs = require('fs'),
    path = require('path'),
    multer  = require('multer'),
    util = require('util'),
    app = express();

app.use(multer({ dest: '/tmp/uploads/'}));

app.post('/upload', function (req, res) {
    var audio = req.files.audio.path,
        video = req.files.video.path,
        output = path.join(process.env.HOME, 'Downloads/panoptes', req.body.filename + '.webm'),
        command = util.format('ffmpeg -f wav -i "%s" -f webm -i "%s" -map 0:0 -map 1:0 "%s"', audio, video, output);
    exec(command, function (err, stdout, stderr) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            fs.unlink(audio);
            fs.unlink(video);
            res.status(200).send(output);
        }
    });
});

var server = app.listen(13000);