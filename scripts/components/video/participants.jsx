"use strict";

var React = require('react');

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

    render: function () {
        /*
        var participants = this.props.participants.map(function (participant) {
            return <Participant key={ participant.id } />;
        });
        return (
            <ul className="participants">{ participants }</ul>
        );
        */
        return (
            <iframe className="tokbox" frameBorder="0" src="http://localhost:13000/tokbox.html"></iframe>
        );
    }
});

module.exports = Participants;
