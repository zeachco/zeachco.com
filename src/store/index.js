import reducers from './reducers';
// import {applyMiddleware, createStore} from 'redux';
// import logger from 'redux-logger';
import {createStore} from 'redux';

// const middlewares = applyMiddleware(logger('dev'));
// const store = createStore(reducers, middlewares);

const store = createStore(reducers);

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
