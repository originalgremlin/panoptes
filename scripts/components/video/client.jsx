"use strict";

var React = require('react'),
    VideoStore = require('../../stores/video'),
    InfoBar = require('./info-bar'),
    Participants = require('./participants'),
    Actions = require('../../actions/video');

var Client = React.createClass({
    getInitialState: function () {
        return {
            room: VideoStore.getRoom(),
            participants: VideoStore.getParticipants()
        };
    },

    componentDidMount: function () {
        VideoStore.addJoinRoomListener(this.handleJoinRoom);
        VideoStore.addAddParticipantsListener(this.handleChangeParticipants);
        VideoStore.addRemoveParticipantsListener(this.handleChangeParticipants);
    },

    componentWillUnmount: function () {
        VideoStore.removeJoinRoomListener(this.handleJoinRoom);
        VideoStore.removeAddParticipantsListener(this.handleChangeParticipants);
        VideoStore.removeRemoveParticipantsListener(this.handleChangeParticipants);
    },

    render: function () {
        return (
            <div className="video-client">
                <InfoBar room={ this.state.room } />
                <Participants participants={ this.state.participants } />
            </div>
        );
    },

    handleJoinRoom: function () {
        this.setState({
            room: VideoStore.getRoom(),
            participants: VideoStore.getParticipants()
        });
    },

    handleChangeParticipants: function () {
        this.setState({
            participants: VideoStore.getParticipants()
        });
    }
});

module.exports = Client;
