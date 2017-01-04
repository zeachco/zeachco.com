import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Routes} from './routes';
import {Provider} from 'react-redux';
// import ga from '../../shared/js/analytics';
// ga.init('UA-60212730-1');
window.axios = require('axios');

import store from './store';
import {session, language} from './store/actions';

session.fetch();
const browsersLang = navigator.language || navigator.userLanguage;
language.setLanguage(browsersLang.split('-')[0]);

render((
  <Provider store={store}>
    <Routes/>
  </Provider>
), document.getElementById('app'));
