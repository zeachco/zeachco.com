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

const defaultState = fromJS({
    session: {
        isAuth: false
    }
});

export default (inboundState = defaultState, action) => {
    const state = inboundState.set('old', reducers(inboundState.get('old') || {}, action));
    switch (action.type) {
        case 'WINDOW_SCROLL': return state;
        default: return state
    }
};
