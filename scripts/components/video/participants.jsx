"use strict";

var React = require('react'),
    _ = require('lodash');

var Participant = React.createClass({
    render: function () {
        return (
            <li className='participant'>
            </li>
        );
    }
});

var Participants = React.createClass({
    propTypes: {
        messages: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    render: function () {
        var participants = this.props.participants.map(function (participant) {
            return <Participant key={ participant.id } />;
        });
        return (
            <ul className="participants">{ participants }</ul>
        );
    }

});

module.exports = Participants;
