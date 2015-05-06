"use strict";

var Actions = require('../../actions/files'),
    FilesStore = require('../../stores/files'),
    React = require('react');

var FileTree = React.createClass({
    propTypes: {
        root: React.PropTypes.string.isRequired
    },

    render: function () {
        return (
            <div className="file-tree">
                <div className="header">
                    <span className="name">{ i18n.t('Name') }</span>
                    <span className="size">{ i18n.t('Size') }</span>
                    <span className="kind">{ i18n.t('Kind') }</span>
                </div>
                <div className="placeholder">&nbsp;</div>
                <Folder ref="folder" path={ this.props.root } />
            </div>
        );
    },

    componentDidMount: function () {
        this.refs.folder.expand();
    }
});

var Folder = React.createClass({
    propTypes: {
        path: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        return { children: [], expanded: false };
    },

    toggle: function () {
        var expanded = this.state.expanded;
        this[expanded ? 'contract' : 'expand']();
    },

    expand: function () {
        var children = FilesStore.getFolderItems(this.props.path);
        this.setState({ children: children, expanded: true });
    },

    contract: function () {
        this.setState({ children: [], expanded: false });
    },

    render: function () {
        var children = this.state.children.map(function (child) {
            return child.isDirectory ?
                <FolderItem key={ child.path } stats={ child } /> :
                <FileItem key={ child.path } stats={ child } />;
        }, this);
        return (
            <ul className="folder">{ children }</ul>
        );
    }
});

var FileItem = React.createClass({
    propTypes: {
        stats: React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            path: React.PropTypes.string.isRequired,
            size: React.PropTypes.number.isRequired
        }).isRequired
    },

    handleClick: function (evt) {
        evt.stopPropagation();
        Actions.clickFile(this.props.stats.path);
    },

    render: function () {
        return (
            <li className="file-item" onClick={ this.handleClick }>
                <div>
                    <span className="name">{ this.props.stats.name }</span>
                    <span className="size">{ this.props.stats.size }</span>
                    <span className="kind">{ i18n.t('file') }</span>
                </div>
            </li>
        );
    }
});

var FolderItem = React.createClass({
    propTypes: {
        stats: React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            path: React.PropTypes.string.isRequired,
            size: React.PropTypes.number.isRequired
        }).isRequired
    },

    handleClick: function (evt) {
        evt.stopPropagation();
        Actions.clickFolder(this.props.stats.path);
        this.refs.folder.toggle();
    },

    render: function () {
        return (
            <li className="folder-item" onClick={ this.handleClick }>
                <div>
                    <span className="name">{ this.props.stats.name }</span>
                    <span className="size">{ this.props.stats.size }</span>
                    <span className="kind">{ i18n.t('folder') }</span>
                </div>
                <Folder ref='folder' path={ this.props.stats.path } />
            </li>
        );
    }
});

module.exports = FileTree;
