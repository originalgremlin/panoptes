"use strict";

var React = require('react'),
    Me = require('./me'),
    Participants = require('./participants'),
    util = require('util');

var Room = React.createClass({
    propTypes: {
        room: React.PropTypes.string.isRequired,
        participants: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    render: function () {
        return (
            <div className="room">
                <Me room={ this.props.room } />
                <Participants participants={ this.props.participants } />
            </div>
        );
    }
});

module.exports = Room;
