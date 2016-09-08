import React, {Component} from 'react';
import {connect} from 'react-redux';
// import actions from '../store/actions';

class Users extends Component {
  render() {
    return (
      <div>Users...</div>
    )
  }
}

const mapStatetoProps = (store, ownProps) => ({
  isAuth: store.session.isAuth,
  isLoading: store.session.isLoading,
  session: store.session,
  items: store.items || []
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

const ConnectedUsers = connect(mapStatetoProps, mapDispatchToProps)(Users);
export {ConnectedUsers as Users};
export default ConnectedUsers;
