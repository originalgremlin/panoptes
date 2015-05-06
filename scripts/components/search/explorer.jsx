"use strict";

var React = require('react'),
    FileViewer = require('../files/viewer'),
    SearchForm = require('./form'),
    SearchResults = require('./results'),
    SearchStore = require('../../stores/search'),
    app = require('../../util/app-mock');

var SearchExplorer = React.createClass({
    getInitialState: function () {
        return {
            clickedFile: null,
            results: SearchStore.getResults()
        };
    },

    componentDidMount: function () {
        SearchStore.addSearchResultsListener(this.handleSearchResults);
        SearchStore.addSearchResultClickListener(this.handleSearchResultClick);
    },

    componentWillUnmount: function () {
        SearchStore.removeSearchResultClickListener(this.handleSearchResultClick);
        SearchStore.removeSearchResultsListener(this.handleSearchResults);
    },

    render: function () {
        return (
            <div className="search-explorer">
                <SearchForm />
                <SearchResults results={ this.state.results } />
                <FileViewer source={ this.state.clickedFile } />
            </div>
        );
    },

    handleSearchResults: function () {
        this.setState({ results: SearchStore.getResults() });
    },

    handleSearchResultClick: function () {
        var result = SearchStore.getLastResultClicked(),
            path = result._source.path;
        this.setState({ clickedFile: 'file://' + path });
        app.addRecentDocument(path);
    }
});

module.exports = SearchExplorer;
