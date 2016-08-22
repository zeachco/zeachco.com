import React from 'react';
import Application from '../components/Application';
import Pages from '../pages';
// import store from '../store';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

// const requireAuth = (nextState, replace) => {
//   let {session} = store.getState();
//   if (!session.isAuth && !session.isLoading) {
//     replace({
//       pathname: '/login',
//       state: {
//         nextPathname: nextState.location.pathname
//       }
//     });
//   }
// };

export const Routes = props => (
  <Router history={browserHistory}>
    <Route path="/" component={Application}>
      <IndexRoute component={Pages.Home}/>
      <Route path="login" component={Pages.Login}/>
      <Route path="signup" component={Pages.Signup}/>
      <Route path="logout" component={Pages.Logout}/>
      <Route path="site/:id" component={Pages.Site}/>
      <Route path="inventory" component={Pages.Inventory}/>
      <Route path="parameters" component={Pages.Parameters}/>
      <Route path="*" component={Pages.Login}/>
    </Route>
  </Router>
);
