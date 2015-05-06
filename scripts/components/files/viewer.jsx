"use strict";

var React = require('react');

var FileViewer = React.createClass({
    render: function () {
        return (
            <div className="file-viewer">
                <iframe src={ this.props.source }></iframe>
            </div>
        );
    }
});

module.exports = FileViewer;
