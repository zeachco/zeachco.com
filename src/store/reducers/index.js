import {
  combineReducers
} from 'redux';

import sessionReducer from './session';
import itemReducer from './items';

export default combineReducers({
  session: sessionReducer,
  items: itemReducer
});
