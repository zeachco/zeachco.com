import React from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import actions from '../store/actions';
import {connect} from 'react-redux';
import {Base} from '.';

const LoginPage = ({errorMessage, isAuth, isLoading}) => (
  <Base id="login">
    <form disabled={isLoading} onSubmit={ev => {
      ev.preventDefault();
      actions.session.login(ev.target.user.value, ev.target.pass.value);
    }}>
      <div>
        <FormGroup controlId="user">
          <ControlLabel>Utilisateur</ControlLabel>
          <FormControl type="text" autoFocus placeholder="email@domain.xyz"/>
        </FormGroup>
        <FormGroup controlId="pass">
          <ControlLabel>Mot de passe</ControlLabel>
          <FormControl type="password" placeholder="********"/>
        </FormGroup>
        <Button bsStyle="primary" type="submit" disabled={isLoading}>Connexion</Button>
      </div>
    </form>
  </Base>
);

const mapStatetoProps = (store, ownProps) => ({isAuth: store.session.isAuth, isLoading: store.session.isLoading, errorMessage: store.session.errorMessage});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => dispatch({type: 'LOGOUT_REQUEST'})
});

export default connect(mapStatetoProps, mapDispatchToProps)(LoginPage);
