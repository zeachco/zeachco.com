import {combineReducers} from 'redux';
import {fromJS} from 'immutable-short-string-notation';

import session from './session';
import items from './items';
import users from './users';
import categories from './categories';
import geometry from './geometry';
import notifications from './notifications';
import language from './language';
import modal from './modal';

const reducers = combineReducers({
    session,
    items,
    users,
    categories,
    geometry,
    notifications,
    language,
    modal
});

const defaultLang = (navigator.language || navigator.userLanguage).split('-')[0];

const defaultState = fromJS({
    currentUser: {
        isAuth: false,
        lang: defaultLang,
        roles: [],
        spaces: []
    },
    inventory: {
        currentSearch: '',
        searchFlags: {},
        searchResults: []
    },
    categories: {
        searchResults: []
    },
    spaces: [],
    forms: {},
    ui: {}
});

export default (inboundState = defaultState, {type, payload}) => {
    const state = window.state = inboundState.set('old', reducers(inboundState.get('old') || {}, {type, payload}));
    switch (type) {
        // UI
        case 'SET_LANGUAGE': return state.setIn('currentUser.lang', payload);
        case 'WINDOW_SCROLL': return state;
        // SESSION
        case 'SESSION_FETCH_DONE': return state.mergeDeep({currentUser: payload || {isAuth: false}});
        case 'DISCONNECT_DONE': return state.setIn('currentUser.isAuth', false);
        // CATEGORIES
        case 'CATEGORIES_SEARCH_DONE': return state.setIn('categories.searchResults', payload);
        // FORMS
        case 'UPDATE_FORM_STATE': return state.setIn('forms.' + payload.path, payload.value);
        default: return state
    }
};
