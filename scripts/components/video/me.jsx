"use strict";

var React = require('react'),
    util = require('util');

var Me = React.createClass({
    propTypes: {
        room: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        return {
            stream: null,
            recorder: null
        };
    },

    componentDidMount: function () {
        var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia).bind(navigator),
            self = this;
        getUserMedia({
            audio: true,
            video: true
        }, function (stream) {
            // set state
            self.setStateFromStream(stream);
            // display webcam
            var video = React.findDOMNode(self.refs.video);
            video.src = window.URL.createObjectURL(stream);
            // record
            var recorder = self.state.recorder;
            recorder.video = video;
            recorder.audioChannels = 2;
            recorder.ondataavailable = self.writeBlobs;
            recorder.start(60 * 60 * 1000);
        }, function () {
            console.error(arguments);
        });
    },

    componentWillUnmount: function () {
        React.findDOMNode(this.refs.video).pause();
        if (this.state.stream !== null) {
            this.state.stream.stop();
        }
        if (this.state.recorder !== null) {
            this.state.recorder.stop();
        }
    },

    setStateFromStream: function (stream) {
        this.setState({
            stream: stream,
            recorder: new MultiStreamRecorder(stream)
        });
    },

    writeBlobs: function (blobs) {
        var filename = util.format('%s-%s-%s', this.props.room, process.env.USER, new Date().toISOString());
        this.writeBlob(blobs.audio, filename + '.wav');
        this.writeBlob(blobs.video, filename + '.webm');
    },

    writeBlob: function (blob, filename) {
        var data = new FormData();
        data.append('file', blob);
        data.append('filename', filename);

        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:13000/upload');
        request.send(data);
    },

    render: function () {
        return (
            <video className="me" ref="video" autoPlay></video>
        );
    }
});

module.exports = Me;
