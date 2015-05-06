"use strict";

var Dispatcher = require('../dispatcher'),
    Constants = require('../constants'),
    Actions = Constants.Actions,
    _ = require('lodash');

var apiKey = "45230782",
    apiSecret = "2063f848d4be9d091c057ce84018e050b089b841",
    sessionId = "1_MX40NTIzMDc4Mn5-MTQzMDk0ODk2ODA5MX56SUg4SHhzTG8xUGNndlEzUjlGbmMzRDJ-fg",
    sessionToken = "T1==cGFydG5lcl9pZD00NTIzMDc4MiZzaWc9ODhiMWNjM2M0MWZiYzA1ZTQ1NjU2MmZlZTc4ZjRiMDQ2MjEzYWEyYzpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTFfTVg0ME5USXpNRGM0TW41LU1UUXpNRGswT0RrMk9EQTVNWDU2U1VnNFNIaHpURzh4VUdObmRsRXpVamxHYm1NelJESi1mZyZjcmVhdGVfdGltZT0xNDMwOTQ4OTg2Jm5vbmNlPTAuOTE4MTQxMzg2NzU0NTYxOA==",
    session = OT.initSession(apiKey, sessionID);

session.on("streamCreated", function(event) {
    session.subscribe(event.stream);
});

session.connect(token, function(error) {
    var publisher = OT.initPublisher();
    session.publish(publisher);
});

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

module.exports = Chat;
