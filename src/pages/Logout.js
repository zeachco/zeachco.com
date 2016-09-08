import React from 'react';
import {connect} from 'react-redux';
import {session} from '../store/actions';

class LoginPage extends React.Component {
  componentDidMount() {
    session.logout();
  }
  render() {
    return (
      <p className="well well-info">Login you out...</p>
    );
  }
}

const mapStatetoProps = (store, ownProps) => ({isAuth: store.session.isAuth, isLoading: store.session.isLoading, session: store.session});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStatetoProps, mapDispatchToProps)(LoginPage);
