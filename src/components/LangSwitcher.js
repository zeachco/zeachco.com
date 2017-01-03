import React from 'react';
import {language} from '../store/actions';
import {Nav, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';

const LANGS = [
    {
        key: 'fr',
        label: 'Français'
    }, {
        key: 'en',
        label: 'English'
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