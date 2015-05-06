"use strict";

var React = require('react'),
    Link = require('react-router').Link;

var Nav = React.createClass({
    render: function () {
        return (
            <header className="nav">
                <ul>
                    <li><Link to="Chat">{ i18n.t('Chat') }</Link></li>
                    <li><Link to="Search">{ i18n.t('Search') }</Link></li>
                    <li><Link to="Explore">{ i18n.t('Explore') }</Link></li>
                </ul>
            </header>
        );
    }
});

module.exports = Nav;
