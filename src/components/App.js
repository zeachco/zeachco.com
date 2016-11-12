import React, {Component} from 'react';
import {Notifications} from '.';
import TopNav from './TopNav';
import Footer from './Footer';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

// const needAuth = session => !session.isAuth && !session.isLoading && browserHistory.push('/login');
// const alreadyAuth = session => session.isAuth && !session.isLoading && browserHistory.push('/');

class App extends Component {
  componentWillReceiveProps(nextProps) {
    const {isLoading, isAuth, path} = nextProps;
    if (isLoading) {
      return;
    }
    if (isAuth) {
      if (['login', 'subscribe'].indexOf(path) !== -1) {
        browserHistory.push('/');
      }
    } else {
      if (['logout', 'users', 'categories', 'inventory', 'settings'].indexOf(path) !== -1) {
        browserHistory.push('/login');
      }
    }
  }
  render() {
    return (
      <div>
        <TopNav/>
        <div className="container">
          {this.props.children}
        </div>
        <Footer/>
        <Notifications />
      </div>
    )
  }
}

const mapStatetoProps = (store, ownProps) => ({
  isAuth: store.session.isAuth,
  isLoading: store.session.isLoading,
  path: ownProps.location.pathname.replace(/^\//, '')
});
const mapDispatchToProps = (dispatch, ownProps) => ({});

const ConnectedApp = connect(mapStatetoProps, mapDispatchToProps)(App);
export {ConnectedApp as App};
