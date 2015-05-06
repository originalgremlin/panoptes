"use strict";

var Actions = require('../../actions/search'),
    React = require('react'),
    _ = require('lodash');

var Form = React.createClass({
    getInitialState: function () {
        return { query: '' };
    },

    componentDidMount: function () {
        this.focus();
    },

    render: function () {
        return (
            <form className="search-form" onSubmit={ this.handleSubmit }>
                <input ref="query" name="query" type="search" value={ this.state.query } onChange={ this.handleChange } />
                <button type="submit">{ i18n.t('Search') }</button>
            </form>
        );
    },

    handleChange: function (evt) {
        this.setState({ query: evt.target.value });
    },

    handleSubmit: function (evt) {
        evt.preventDefault();
        var query = this.state.query.trim();
        if (!_.isEmpty(query)) {
            Actions.query(query);
        }
        this.setState({ query: '' });
        this.focus();
    },

    focus: function () {
        React.findDOMNode(this.refs.query).focus();
    }
});

module.exports = Form;