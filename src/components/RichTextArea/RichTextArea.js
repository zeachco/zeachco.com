import React, { Component, PropTypes } from 'react'
import cx from 'classnames';
import autoBind from 'auto-bind';
export class RichTextArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rich: true,
            html: ''
        };
        autoBind(this);
    }

    componentWillReceiveProps({ value }) {
        this.setState({
            html: value
        });
    }

    _handleRichKeyPress(e) {
        e.preventDefault();
        this._updateHTML(e.target.innerHTML);
    }

    _handlePlainKeyPress(e) {
        e.preventDefault();
        this._updateHTML(e.target.innerText);
    }

    _updateHTML(html) {
        const { onChange } = this.props;
        this.setState({ html });
        onChange(html);
    }

    _toggleMode(e) {
        e.preventDefault();
        this.setState({ rich: !this.state.rich });
    }

    _renderPlain() {
        const { className } = this.props;
        const { html } = this.state;
        return (
            <div
                className={cx('rich-text-area_rich', className)}
                onBlur={this._handlePlainKeyPress}
                contentEditable={true}>
                {html}
            </div>
        );
    }

    _renderRich() {
        const { className } = this.props;
        const { html } = this.state;
        return (
            <div
                className={cx('rich-text-area_rich', className)}
                onBlur={this._handleRichKeyPress}
                contentEditable={true}
                dangerouslySetInnerHTML={{ __html: html }} />
        );
    }

    render() {
        const { className } = this.props;
        const { rich } = this.state;
        const content = rich ? this._renderRich() : this._renderPlain();
        const toggleText = rich ? 'plain' : 'rich';

        return (
            <div className="rich-text-area">
                <a
                    className="rich-text-area_toggle"
                    onClick={this._toggleMode}
                >{toggleText}</a>
                {content}
            </div>
        );
    }
}

const { string, func } = PropTypes
RichTextArea.propTypes = {
    className: string,
    value: string,
    onChange: func
};

/**
 *
                                    className="form-control"
                                    name="description"
                                    placeholder="This shirt is made of 97% coton and 4% magic"
                                    rows={12}
                                    value={description}
 */