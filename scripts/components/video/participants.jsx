"use strict";

var fs = require('fs'),
    React = require('react');

var Participant = React.createClass({
    render: function () {
        return (
            <li className="participant">boo</li>
        );
    }
});

var Participants = React.createClass({
    propTypes: {
        participants: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    getInitialState: function () {
        return {
            stream: null,
            recorder: null,
            audioFile: null,
            videoFile: null
        };
    },

    componentDidMount: function () {
        var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia).bind(navigator),
            self = this;
        getUserMedia({
            audio: true,
            video: true
        }, function (stream) {
            self.state.stream = stream;

            // display
            var video = React.findDOMNode(self.refs.video);
            video.src = window.URL.createObjectURL(stream);

            // record
            var recorder = self.state.recorder = new MultiStreamRecorder(stream);
            recorder.video = video;
            recorder.audioChannels = 1;
            recorder.ondataavailable = function (blobs) {
                // blobs.audio -> write to audioFile
                // blobs.video -> write to videoFile
            };
            recorder.onstop = function (err) {
                console.log(arguments);
                // close files
            };
            recorder.start(3 * 1000);
        }, function () {
            console.error(arguments);
        });
    },

    render: function () {
        var participants = this.props.participants.map(function (participant) {
            return <Participant key={ participant.id } />;
        });
        return (
            <ul className="participants">
                <li className="me">
                    <video ref="video" autoPlay></video>
                </li>
                { participants }
            </ul>
        );
    },

    componentWillUnmount: function () {
        React.findDOMNode(this.refs.video).pause();
        if (this.state.stream !== null) {
            this.state.stream.stop();
        }
        if (this.state.recorder !== null) {
            this.state.recorder.stop();
        }
    }
});

module.exports = Participants;
