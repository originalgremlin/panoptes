"use strict";

var mirror = function (arr) {
    var rv = { };
    arr.forEach(function (key) {
        rv[key] = key;
    });
    return rv;
};

module.exports = {
    Actions: mirror([
        'JOIN_ROOM',
        'ADD_PARTICIPANTS',
        'REMOVE_PARTICIPANTS',
        'CLICK_FILE',
        'CLICK_FOLDER',
        'CLICK_SEARCH_RESULT',
        'UPDATE_SETTINGS',
        'UNSET_SETTINGS',
        'SEARCH_QUERY'
    ]),
    Events: mirror([
        'JOIN_ROOM',
        'ADD_PARTICIPANTS',
        'REMOVE_PARTICIPANTS',
        'CLICK_FILE',
        'CLICK_FOLDER',
        'CLICK_SEARCH_RESULT',
        'CHANGE_SETTINGS',
        'SEARCH_RESULTS'
    ])
};
