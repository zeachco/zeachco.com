import React from 'react'
import {connect} from 'react-redux';
import I18N from '../i18n';

const Translate = ({
    lang = 'fr',
    content,
    data = {}
}) => {
    const keys = I18N[lang];
    let message = keys[content] || `[${content}]`;
    for (var k in data) {
        if (data.hasOwnProperty(k)) {
            message.replace(`{${k}}`, data[k])
        }
    }
    return (
        <span>{message}</span>
    );
}

const mapStatetoProps = (state) => ({lang: state.language})
const ConnectedTranslate = connect(mapStatetoProps)(Translate);

export {ConnectedTranslate as Translate};