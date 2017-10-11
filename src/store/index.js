import {createStore} from 'redux';

import reducers from './reducers';

let store = null;

if (process.env.NODE_ENV !== 'production') {
    // Allow Redux devtools
    // https://github.com/zalmoxisus/redux-devtools-extension#usage
    store = createStore(
        reducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
            actionsBlacklist: ['WINDOW_RESIZE', 'WINDOW_SCROLL']
        }) // eslint-disable-line  no-underscore-dangle
    );

    // HMR functionnality
    if (module.hot) module.hot.accept('./reducers', () => store.replaceReducer(require('./reducers')));
} else {
    store = createStore(reducers);
}

export default store;
