import reducers from './reducers';
// import {applyMiddleware, createStore} from 'redux';
// import logger from 'redux-logger';
import {createStore} from 'redux';

// const middlewares = applyMiddleware(logger('dev'));
// const store = createStore(reducers, middlewares);

const store = createStore(reducers);

export default store;
