import {combineReducers} from 'redux'

import session from './session';
import items from './items';
import users from './users';
import categories from './categories';
import geometry from './geometry';
import notifications from './notifications';
import language from './language';

export default combineReducers({
    session,
    items,
    users,
    categories,
    geometry,
    notifications,
    language
});
