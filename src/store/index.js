import reducers from './reducers';
import actions from './actions';
import {createStore} from 'redux';

const store = createStore(reducers);
store.actions = actions;

import axios from 'axios';
axios.interceptors.response.use(function(response) {
    return Promise.resolve(response);
}, function(err) {
    console.log(err);
    if (err.response.status === 403) {
        store.dispatch({type: 'SESSION_LOGIN_FAIL'});
    }
    return Promise.reject(err);
});

export default store;
