import {
  combineReducers
} from 'redux';

import sessionReducer from './session';
import itemReducer from './items';
import userReducer from './users';
import geometryReducer from './geometry';
import notificationsReducer from './notifications';

export default combineReducers({
  session: sessionReducer,
  items: itemReducer,
  users: userReducer,
  geometry: geometryReducer,
  notifications: notificationsReducer
});
