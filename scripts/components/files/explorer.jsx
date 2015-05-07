"use strict";

var React = require('react'),
    FilesStore = require('../../stores/files'),
    FileTree = require('./tree'),
    FileViewer = require('./viewer'),
    app = require('../../util/app-mock');

var FileExplorer = React.createClass({
    propTypes: {
        root: React.PropTypes.string.isRequired
    },

    getDefaultProps: function () {
        return { root: process.env.HOME };
    },

    getInitialState: function () {
        return { clickedFile: null };
    },

    componentDidMount: function () {
        FilesStore.addFileClickListener(this.handleFileClick);
    },

    componentWillUnmount: function () {
        FilesStore.removeFileClickListener(this.handleFileClick);
    },

    render: function () {
        return (
            <div className="file-explorer">
                <FileTree root={ this.props.root } />
                <FileViewer source={ this.state.clickedFile } />
            </div>
        );
    },

    handleFileClick: function () {
        var path = FilesStore.getLastFileClicked();
        this.setState({ clickedFile: 'file://' +  path });
        app.addRecentDocument(path);
    }
});

module.exports = FileExplorer;
