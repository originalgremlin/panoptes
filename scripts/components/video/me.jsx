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
            var video = React.findDOMNode(self.refs.video);
            video.src = window.URL.createObjectURL(stream);
            self.setState({ stream: stream });
        }, function () {
            console.error(arguments);
        });
    },

    componentWillUnmount: function () {
        this.pause();
        this.state.stream.stop();
        this.setState({ stream: null });
    },

    render: function () {
        return (
            <form className="me">
                <video ref="video" autoPlay></video>
                <button type="button" onClick={ this.pause }>{ i18n.t('Pause') }</button>
                <button type="button" onClick={ this.record }>{ i18n.t('Record') }</button>
            </form>
        );
    },

    pause: function () {
        if (this.state.recorder !== null) {
            this.state.recorder.stop();
            this.setState({ recorder: null });
        }
    },

    record: function () {
        if (this.state.recorder !== null) {
            this.state.recorder.stop();
            this.setState({ recorder: null });
        }
        var recorder = new MultiStreamRecorder(this.state.stream);
        recorder.video = React.findDOMNode(this.refs.video);
        recorder.audioChannels = 1;
        recorder.ondataavailable = this.upload;
        recorder.start(60 * 60 * 1000);
        this.setState({ recorder: recorder });
    },

    upload: function (blobs) {
        var date = new Date().toISOString(),
            filename = util.format('%s-%s-%s', this.props.room, process.env.USER, date);

        var data = new FormData();
        data.append('audio', blobs.audio);
        data.append('video', blobs.video);
        data.append('date', date);
        data.append('filename', filename);

        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:13000/upload');
        request.send(data);
    }
});

module.exports = Me;
