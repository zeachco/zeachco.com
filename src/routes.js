import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './components/App' 
import requireAuth from './components/utils/requireAuth'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Logout from './pages/Logout'
import Site from './pages/Site'
import Categories from './pages/Categories'
import EditItem from './pages/EditItem'
import Settings from './pages/Settings'
import Inventory from './pages/Inventory'
import Users from './pages/Users'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const Routes = () => (
    <Router history={ browserHistory }>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="login" component={requireAuth(Login, Home)}/>
            <Route path="signup" component={requireAuth(Signup, Home)}/>
            <Route path="logout" component={requireAuth(Logout)}/>
            <Route path="site/:_id" component={requireAuth(Site)}/>
            <Route path="users" component={requireAuth(Users)}/>
            <Route path="categories" component={requireAuth(Categories)}/>
            <Route path="inventory">
                <IndexRoute component={requireAuth(Inventory)}/>
                <Route path="new" component={requireAuth(EditItem)}/>
                <Route path="item/:_id" component={requireAuth(EditItem)}/>
            </Route>
            <Route path="settings" component={requireAuth(Settings)}/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
);

export default Routes;
