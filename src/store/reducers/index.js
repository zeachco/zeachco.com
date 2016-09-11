import {combineReducers} from 'redux';

import sessionReducer from './session';
import itemReducer from './items';
import userReducer from './users';

export default combineReducers({session: sessionReducer, items: itemReducer, users: userReducer});
