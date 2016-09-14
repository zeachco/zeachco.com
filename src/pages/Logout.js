import React from 'react';
import {connect} from 'react-redux';
import {session} from '../store/actions';
import {Base} from '.';

class LoginPage extends React.Component {
  componentDidMount() {
    session.logout();
  }
  render() {
    return (
      <Base>
        <p className="well well-info">Déconnection en cours...</p>
      </Base>
    );
  }
}

const mapStatetoProps = (store, ownProps) => ({isAuth: store.session.isAuth, isLoading: store.session.isLoading, session: store.session});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStatetoProps, mapDispatchToProps)(LoginPage);
