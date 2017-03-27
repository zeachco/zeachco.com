import React from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';

import { setLanguage } from '../store/actions/language';

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

const LangSwitcher = ({lang}) => (
    <Nav bsStyle="pills" activeKey={lang} onSelect={setLanguage}>
        {LANGS.map(l => (
            <NavItem eventKey={l.key} key={l.key} disabled={l.disabled}>{l.label}</NavItem>
        ))}
    </Nav>
)

LangSwitcher.propTypes = {
    lang: React.PropTypes.string.isRequired
}

const mapStatetoProps = (store) => ({lang: store.language});
export default connect(mapStatetoProps)(LangSwitcher);
