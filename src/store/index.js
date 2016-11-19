import reducers from './reducers';
import actions from './actions';
import {createStore} from 'redux';

const store = createStore(reducers);
store.actions = actions;

export default store;
