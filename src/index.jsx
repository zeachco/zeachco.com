import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import 'immutable-short-string-notation';

import './store/actions/geometry';
import {bootstrap} from './store/actions';

bootstrap();

import store from './store';
let Routes = require('./routes');

const Hook = () => {
	Routes = require('./routes').default;
	render(
    <AppContainer>
      <Provider store={store}>
        <Routes />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
}

Hook();

// HRM functionality
if (module && module.hot) module.hot.accept('./routes', Hook);
