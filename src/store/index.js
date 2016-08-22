import reducers from './reducers';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';

const middlewares = applyMiddleware(logger());
const store = createStore(reducers, middlewares);

export default store;
