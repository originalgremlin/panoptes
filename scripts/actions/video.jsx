"use strict";

var Dispatcher = require('../dispatcher'),
    Constants = require('../constants'),
    Actions = Constants.Actions,
    _ = require('lodash');

var Video = {
    joinRoom: function (room) {
        Dispatcher.dispatch({
            type: Actions.JOIN_ROOM,
            room: room,
            participants: []
        });
    },

    addParticipants: function (participants) {
        Dispatcher.dispatch({
            type: Actions.ADD_PARTICIPANTS,
            participants: participants
        });
    },

    removeParticipants: function (participants) {
        Dispatcher.dispatch({
            type: Actions.REMOVE_PARTICIPANTS,
            participants: participants
        });
    }
};

module.exports = Video;
