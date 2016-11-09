import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Routes} from './routes';
import {Provider} from 'react-redux';
// import ga from '../../shared/js/analytics';
// ga.init('UA-60212730-1');

import store from './store';
import {session} from './store/actions';

session.fetch();

render((
  <Provider store={store}>
    <Routes/>
  </Provider>
), document.getElementById('app'));
