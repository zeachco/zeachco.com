import React from 'react';
import {browserHistory} from 'react-router';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import actions from '../store/actions';
import {connect} from 'react-redux';

const LoginPage = ({session, isAuth, isLoading, error})=>(
  <div id="login">
    <form disabled={isLoading} onSubmit={ev=>{
      ev.preventDefault();
      actions.session.login(ev.target.user.value, ev.target.pass.value);
      browserHistory.push('/');
    }}>
      {error?<p>{error}</p>:null}
      <p>
        <FormGroup controlId="user">
          <ControlLabel>Utilisateur</ControlLabel>
          <FormControl type="text" autoFocus placeholder="email@domain.xyz" />
        </FormGroup>
        <FormGroup controlId="pass">
          <ControlLabel>Mot de passe</ControlLabel>
          <FormControl type="password" placeholder="********" />
        </FormGroup>
        <Button bsStyle="primary" type="submit">Connexion</Button>
      </p>
    </form>
  </div>
);

const mapStatetoProps = (store, ownProps) => ({isAuth: store.session.isAuth, isLoading: store.session.isLoading, session: store.session});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => dispatch({type: 'LOGOUT_REQUEST'})
});

export default connect(mapStatetoProps, mapDispatchToProps)(LoginPage);
