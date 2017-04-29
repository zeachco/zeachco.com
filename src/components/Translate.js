import React from 'react'
import { connect } from 'react-redux'
import I18N from '../i18n'

const hydrate = (lang = 'fr', content = 'invalid_key', data = {}) => {
    const keys = I18N[lang];
    let message = keys[content] || content;
    if (typeof keys[content] === 'undefined') {
        console.warn(content, `not found for ${lang}`, data); // eslint-disable-line no-console
    }

    for (var k in data) {
        if (data.hasOwnProperty(k)) {
            message = message.replace(new RegExp(`{${k}}`, 'g'), data[k])
        }
    }
    return message;
}

const Translate = ({lang, content, data}) => {
    const message = hydrate(lang, content, data);
    return (<span dangerouslySetInnerHTML={{
        __html: message
    }}/>);
}

Translate.defaultProps = {
    data: {}
}

Translate.propTypes = {
    lang: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    data: React.PropTypes.object
};

const mapStatetoProps = (state) => ({lang: state.get('old').language})

Translate.content = () => ''

export default connect(mapStatetoProps)(Translate);
