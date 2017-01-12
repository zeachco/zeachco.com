import React from 'react';
import {language} from '../store/actions';
import {Nav, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';

const LANGS = [
    {
        key: 'en',
        label: 'english'
    }, {
        key: 'fr',
        label: 'français'
    }, {
        key: 'es',
        label: 'español',
        disabled: true
    }, {
        key: 'it',
        label: 'italiano',
        disabled: true
    }, {
        key: 'hi',
        label: 'हिन्दी (hindī)',
        disabled: true
    }
];

const switchLang = e => {
    language.setLanguage(e);
}

const LangSwitcher = props => (
    <Nav bsStyle="pills" activeKey={props.lang} onSelect={switchLang}>
        {LANGS.map(l => (
            <NavItem eventKey={l.key} key={l.key} disabled={l.disabled}>{l.label}</NavItem>
        ))}
    </Nav>
)

const mapStatetoProps = (store) => ({lang: store.language});
const ConnectedLangSwitcher = connect(mapStatetoProps)(LangSwitcher);

export {ConnectedLangSwitcher as LangSwitcher};