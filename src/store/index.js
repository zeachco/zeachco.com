import { createStore, combineReducers } from 'redux';

import session from './reducers/session';
import items from './reducers/items';
import users from './reducers/users';
import categories from './reducers/categories';
import geometry from './reducers/geometry';
import notifications from './reducers/notifications';
import language from './reducers/language';

const store = createStore(combineReducers({
  session,
  items,
  users,
  categories,
  geometry,
  notifications,
  language
}));

export default store;
