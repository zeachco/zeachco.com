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
        label: 'español'
    }, {
        key: 'it',
        label: 'italiano'
    }, {
        key: 'hi',
        label: 'हिन्दी (hindī)'
    }
];

const switchLang = e => {
    language.setLanguage(e);
}

const LangSwitcher = props => (
    <Nav bsStyle="pills" activeKey={props.lang} onSelect={switchLang}>
        {LANGS.map(l => (
            <NavItem eventKey={l.key} key={l.key}>{l.label}</NavItem>
        ))}
    </Nav>
)

const mapStatetoProps = (store) => ({lang: store.language});
const ConnectedLangSwitcher = connect(mapStatetoProps)(LangSwitcher);

export {ConnectedLangSwitcher as LangSwitcher};