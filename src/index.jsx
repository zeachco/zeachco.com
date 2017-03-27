import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import './store/actions/geometry'
import { fetch } from './store/actions/session'
import { setLanguage } from './store/actions/language'

fetch();
const browsersLang = navigator.language || navigator.userLanguage;
setLanguage(browsersLang.split('-')[0]);

let Routes = require('./routes');
let store = require('./store');

const Hook = () => {
	console.clear(); // eslint-disable-line no-console
	Routes = require('./routes').default;
	store = require('./store').default;
	render(
    <AppContainer>
      <Provider store={store}>
        <Routes />
      </Provider>
    </AppContainer>,
    document.querySelector("#root")
  );
}

Hook();

// HRM functionality
if (module && module.hot) {
  module.hot.accept('./routes', Hook);
  module.hot.accept('./store', Hook);
}
