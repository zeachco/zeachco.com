import React from 'react';
import {App} from './components';
import Pages from './pages';
import * as Page from './pages';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

export const Routes = props => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Pages.Home}/>
      <Route path="login" component={Pages.Login}/>
      <Route path="signup" component={Pages.Signup}/>
      <Route path="logout" component={Pages.Logout}/>
      <Route path="site/:id" component={Pages.Site}/>
      <Route path="users" component={Page.Users}/>
      <Route path="categories" component={Page.Categories}/>
      <Route path="inventory" component={Page.Inventory}/>
      <Route path="settings" component={Page.Settings}/>
      <Route path="*" component={Page.NotFound}/>
    </Route>
  </Router>
);
