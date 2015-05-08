"use strict";

var Elasticsearch = require('elasticsearch'),
    EventEmitter = require('events').EventEmitter,
    Dispatcher = require('../dispatcher'),
    Constants = require('../constants'),
    Actions = Constants.Actions,
    Events = Constants.Events,
    client = new Elasticsearch.Client({ host: 'http://localhost:19200' }),
    _ = require('lodash');

var data = {
    lastResultClicked: null,
    query: null,
    results: []
};

var Store = _.assign({}, EventEmitter.prototype, {
    // events
    emitSearchResults: function () {
        this.emit(Events.SEARCH_RESULTS);
    },

    addSearchResultsListener: function (callback) {
        this.on(Events.SEARCH_RESULTS, callback);
    },

    removeSearchResultsListener: function (callback) {
        this.removeListener(Events.SEARCH_RESULTS, callback);
    },

    emitSearchResultClick: function () {
        this.emit(Events.CLICK_SEARCH_RESULT);
    },

    addSearchResultClickListener: function (callback) {
        this.on(Events.CLICK_SEARCH_RESULT, callback);
    },

    removeSearchResultClickListener: function (callback) {
        this.removeListener(Events.CLICK_SEARCH_RESULT, callback);
    },

    // access
    getLastResultClicked: function () {
        return data.lastResultClicked;
    },

    getQuery: function () {
        return data.query;
    },

    getResults: function () {
        return data.results;
    }
});

Store.dispatchToken = Dispatcher.register(function (action) {
    switch (action.type) {
        case Actions.SEARCH_QUERY:
            client.search({
                index: 'aerofs',
                type: 'video-chat',
                body: {
                    "size": 100,
                    "query": {
                        "multi_match": {
                            "query": action.query,
                            "fields": ["text"]
                        }
                    },
                    "highlight": {
                        "order": "score",
                        "fields": {"text": {}}
                    }
                }
            }).then(function (response) {
                data.results = response.hits.hits;
                Store.emitSearchResults();
            }, function (err) {
                console.error(err.message);
                data.results = [];
                Store.emitSearchResults();
            });
            break;

        case Actions.CLICK_SEARCH_RESULT:
            data.lastResultClicked = action.result;
            Store.emitSearchResultClick();
            break;

        default:
            break;
    }
});

module.exports = Store;
