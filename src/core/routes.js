import React from 'react';
import Application from '../components/Application';
import Pages from '../pages';
import store from '../store';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

const requireAuth = (nextState, replace) => {
  let {isAuth, isLoading} = store.getState().session;
  if (!isAuth && !isLoading) {
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
};

export const Routes = props => (
  <Router history={browserHistory}>
    <Route path="/" component={Application}>
      <IndexRoute component={Pages.Home}/>
      <Route path="login" component={Pages.Login}/>
      <Route path="signup" component={Pages.Signup}/>
      <Route path="logout" component={Pages.Logout}/>
      <Route path="site/:id" component={Pages.Site} onEnter={requireAuth}/>
      <Route path="users" component={Pages.Inventory} onEnter={requireAuth}/>
      <Route path="categories" component={Pages.Inventory} onEnter={requireAuth}/>
      <Route path="inventory" component={Pages.Inventory} onEnter={requireAuth}/>
      <Route path="parameters" component={Pages.Parameters} onEnter={requireAuth}/>
      <Route path="*" component={Pages.Home}/>
    </Route>
  </Router>
);
