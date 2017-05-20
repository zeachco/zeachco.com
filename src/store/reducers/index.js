import {combineReducers} from 'redux';
import {fromJS} from 'immutable';

import session from './session';
import items from './items';
import users from './users';
import categories from './categories';
import geometry from './geometry';
import notifications from './notifications';
import language from './language';

const reducers = combineReducers({
    session,
    items,
    users,
    categories,
    geometry,
    notifications,
    language
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
    forms: {}
});

export default (inboundState = defaultState, {type, payload}) => {
    const state = window.state = inboundState.set('old', reducers(inboundState.get('old') || {}, {type, payload}));
    switch (type) {
        // UI
        case 'SET_LANGUAGE': return state.setIn('currentUser.lang', payload);
        case 'WINDOW_SCROLL': return state;
        // SESSION
        case 'SESSION_FETCH_DONE': return state.mergeDeep({currentUser: payload || {isAuth: false}});
        case 'LOGOUT_DONE': return state.setIn('currentUser.isAuth', false);
        // CATEGORIES
        case 'CATEGORIES_SEARCH_DONE': return state.setIn('categories.searchResults', payload);
        // FORMS
        case 'UPDATE_FORM_STATE': return state.setIn(['forms', payload.formName, payload.key], payload.value);
        default: return state
    }
};
