"use strict";

var Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    RouteHandler = Router.RouteHandler,
    // components
    React = require('react'),
    VideoChat = require('./build/scripts/components/video/client'),
    VideoExplorer = require('./build/scripts/components/files/explorer'),
    VideoSearch = require('./build/scripts/components/search/explorer'),
    Nav = require('./build/scripts/components/nav'),
    // utilities
    i18n = window.i18n = require('./build/scripts/util/i18n'),
    _ = require('lodash');

var App = React.createClass({
    render: function () {
        return (
            <div id="app">
                <Nav />
                <RouteHandler />
            </div>
        );
    }
});

var routes = (
    <Route name="App" handler={ App } path={ '/' }>
        <Route name="Chat" handler={ VideoChat } />
        <Route name="Search" handler={ VideoSearch } />
        <Route name="Explore" handler={ VideoExplorer } />
        <DefaultRoute name="Default" handler={ VideoChat } />
    </Route>
);

Router.run(routes, Router.HashLocation, function (Handler, state) {
    React.render(<Handler />, document.body);
    document.title = 'Panoptes';
});
