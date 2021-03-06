import React from 'react'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import Base from './Base'
import Translate from '../components/Translate'
import { login } from '../store/actions/session'

const LoginPage = ({ isLoading }) => (
  <Base id="login">
    <form
      disabled={isLoading}
      onSubmit={ev => {
          ev.preventDefault();
          login(ev.target.user.value, ev.target.pass.value)
        }}
      >
      <div>
        <FormGroup controlId="user">
          <ControlLabel><Translate content="user" /></ControlLabel>
          <FormControl type="text" autoFocus placeholder="email@domain.xyz"/>
        </FormGroup>
        <FormGroup controlId="pass">
          <ControlLabel><Translate content="password" /></ControlLabel>
          <FormControl type="password" placeholder="********"/>
        </FormGroup>
        <Button bsStyle="primary" type="submit" disabled={isLoading}><Translate content="login"/></Button>
      </div>
    </form>
  </Base>
)

LoginPage.propTypes = {
  isLoading: React.PropTypes.bool.isRequired,
  isAuth: React.PropTypes.bool.isRequired,
  errorMessage: React.PropTypes.string
};

const mapStatetoProps = (store) => ({
  isAuth: store.get('old').session.isAuth,
  isLoading: store.get('old').session.isLoading,
  errorMessage: store.get('old').session.errorMessage
});

export default connect(mapStatetoProps)(LoginPage)
