var Actions = require('../../actions/search'),
    React = require('react'),
    app = require('../../util/app-mock'),
    crypto = require('crypto');

var Highlights = React.createClass({
    propTypes: {
        highlights: React.PropTypes.shape({
            file: React.PropTypes.arrayOf(React.PropTypes.string.isRequired)
        }).isRequired
    },

    render: function () {
        var highlights = (this.props.highlights.text || []).map(function (highlight) {
            return <li className="highlight" key={ this.md5(highlight) } dangerouslySetInnerHTML={{ __html: highlight }} />;
        }, this);
        return (
            <ul className="highlights">{ highlights }</ul>
        );
    },

    md5: function (contents) {
        return crypto.createHash('md5').update(contents).digest("hex");
    }
});

var Result = React.createClass({
    propTypes: {
        result: React.PropTypes.shape({
            _source: React.PropTypes.object.isRequired,
            highlights: React.PropTypes.object
        }).isRequired
    },

    render: function () {
        var source = this.props.result._source,
            highlights = this.props.result.highlight || {};
        return (
            <li className="search-result" onClick={ this.handleClick }>
                <div>
                    <span className="path">{ source.path.split('/').pop() }</span>
                    <span className="size">{ source.size }</span>
                </div>
                <Highlights highlights={ highlights } />
            </li>
        );
    },

    handleClick: function (evt) {
        evt.stopPropagation();
        Actions.clickResult(this.props.result);
    }
});

var Results = React.createClass({
    propTypes: {
        results: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                _source: React.PropTypes.object.isRequired,
                highlights: React.PropTypes.object
            }).isRequired
        ).isRequired
    },

    render: function () {
        var results = this.props.results.map(function (result) {
            return <Result key={ result._source.path } result={ result } />;
        });
        return (
            <div className="search-results">
                <div className="header">
                    <span className="name">{ i18n.t('Name') }</span>
                    <span className="size">{ i18n.t('Size') }</span>
                </div>
                <div className="placeholder">&nbsp;</div>
                <ul className="search-results">{ results }</ul>
            </div>
        );
    }
});

module.exports = Results;