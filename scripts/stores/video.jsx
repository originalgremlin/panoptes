"use strict";

var EventEmitter = require('events').EventEmitter,
    Dispatcher = require('../dispatcher'),
    Constants = require('../constants'),
    Actions = Constants.Actions,
    Events = Constants.Events,
    _ = require('lodash');

var data = {
    room: 'panoptes',
    participants: []
};

var Store = _.assign({}, EventEmitter.prototype, {
    // events
    emitJoinRoom: function () {
        this.emit(Events.JOIN_ROOM);
    },

    addJoinRoomListener: function (callback) {
        this.on(Events.JOIN_ROOM, callback);
    },

    removeJoinRoomListener: function (callback) {
        this.removeListener(Events.JOIN_ROOM, callback);
    },

    emitAddParticipants: function () {
        this.emit(Events.ADD_PARTICIPANTS);
    },

    addAddParticipantsListener: function (callback) {
        this.on(Events.ADD_PARTICIPANTS, callback);
    },

    removeAddParticipantsListener: function (callback) {
        this.removeListener(Events.ADD_PARTICIPANTS, callback);
    },

    emitRemoveParticipants: function () {
        this.emit(Events.REMOVE_PARTICIPANTS);
    },

    addRemoveParticipantsListener: function (callback) {
        this.on(Events.REMOVE_PARTICIPANTS, callback);
    },

    removeRemoveParticipantsListener: function (callback) {
        this.removeListener(Events.REMOVE_PARTICIPANTS, callback);
    },

    // access
    getRoom: function () {
        return data.room;
    },

    getParticipants: function () {
        return data.participants;
    }
});

Store.dispatchToken = Dispatcher.register(function (action) {
    switch (action.type) {
        case Actions.JOIN_ROOM:
            data = {
                room: action.room,
                participants: action.participants
            };
            Store.emitJoinRoom();
            break;

        case Actions.ADD_PARTICIPANTS:
            // TODO: will not union properly if each participant is an object
            data.participants = _.union(data.participants, action.participants);
            Store.emitAddParticipants();
            break;

        case Actions.REMOVE_PARTICIPANTS:
            // TODO: will not remove properly if each participant is an object
            data.participants = _.without(data.participants, action.participants);
            Store.emitRemoveParticipants();
            break;

        default:
            break;
    }
});

module.exports = Store;
