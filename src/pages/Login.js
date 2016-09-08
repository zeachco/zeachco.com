import React from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import actions from '../store/actions';
import {connect} from 'react-redux';

const LoginPage = ({errorMessage, isAuth, isLoading}) => (
  <div id="login">
    <form disabled={isLoading} onSubmit={ev => {
      ev.preventDefault();
      actions.session.login(ev.target.user.value, ev.target.pass.value);
    }}>
      {errorMessage && (
        <p className="alert alert-danger">{errorMessage}</p>
      )}
      {isLoading && (
        <p className="alert alert-info">Connexion...</p>
      )}
      <p>
        <FormGroup controlId="user">
          <ControlLabel>Utilisateur</ControlLabel>
          <FormControl type="text" autoFocus placeholder="email@domain.xyz"/>
        </FormGroup>
        <FormGroup controlId="pass">
          <ControlLabel>Mot de passe</ControlLabel>
          <FormControl type="password" placeholder="********"/>
        </FormGroup>
        <Button bsStyle="primary" type="submit" disabled={isLoading}>Connexion</Button>
      </p>
    </form>
  </div>
);

const mapStatetoProps = (store, ownProps) => ({isAuth: store.session.isAuth, isLoading: store.session.isLoading, errorMessage: store.session.errorMessage});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => dispatch({type: 'LOGOUT_REQUEST'})
});

export default connect(mapStatetoProps, mapDispatchToProps)(LoginPage);
