import {
  combineReducers
} from 'redux';

import sessionReducer from './session';
import itemReducer from './items';
import userReducer from './users';
import categoriesReducer from './categories';
import geometryReducer from './geometry';
import notificationsReducer from './notifications';
import languageReducer from './language';

export default combineReducers({
  session: sessionReducer,
  items: itemReducer,
  users: userReducer,
  categories: categoriesReducer,
  geometry: geometryReducer,
  notifications: notificationsReducer,
  language: languageReducer
});
