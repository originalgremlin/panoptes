"use strict";

var React = require('react'),
    Actions = require('../../actions/video'),
    _ = require('lodash');

var InfoBar = React.createClass({
    propTypes: {
        room: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        return { room: this.props.room };
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({ room: nextProps.room });
    },

    render: function () {
        return (
            <form className="info-bar" onSubmit={ this.handleSubmit }>
                <label>{ i18n.t('Room Name:') }</label>
                <input name="room" value={ this.state.room } onChange={ this.handleChange } />
                <button type="submit">{ i18n.t('Join!') }</button>
            </form>
        );
    },

    handleChange: function (evt) {
        this.setState({ room: evt.target.value });
    },

    handleSubmit: function (evt) {
        evt.preventDefault();
        var room = this.state.room.trim();
        if (!_.isEmpty(room)) {
            Actions.joinRoom(room);
        }
    }
});

module.exports = InfoBar;
