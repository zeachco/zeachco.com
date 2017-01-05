import React from 'react'
import {connect} from 'react-redux';
import I18N from '../i18n';

const Translate = ({
    lang = 'fr',
    content = 'invalid_key',
    data = {}
}) => {
    const keys = I18N[lang];
    let message = keys[content] || content;
    if (keys[content] === undefined) {
        console.warn(content, `not found for ${lang}`, data);
    }

    for (var k in data) {
        if (data.hasOwnProperty(k)) {
            message = message.replace(new RegExp(`{${k}}`, 'g'), data[k])
        }
    }
    return (<span dangerouslySetInnerHTML={{
        __html: message
    }}/>);
}

const mapStatetoProps = (state) => ({lang: state.language})
const ConnectedTranslate = connect(mapStatetoProps)(Translate);

export {ConnectedTranslate as Translate};