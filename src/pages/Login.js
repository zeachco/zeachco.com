import React from 'react'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import actions from '../store/actions'
import {connect} from 'react-redux'
import {Base} from '.'
import {Translate} from '../components'

const LoginPage = ({errorMessage, isAuth, isLoading}) => (
  <Base id="login">
    <form
      disabled={isLoading}
      onSubmit={ev => {
      ev.preventDefault();
      actions
        .session
        .login(ev.target.user.value, ev.target.pass.value)
    }}>
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

const mapStatetoProps = (store, ownProps) => ({isAuth: store.session.isAuth, isLoading: store.session.isLoading, errorMessage: store.session.errorMessage})
const ConnectedLogin = connect(mapStatetoProps)(LoginPage)

export default ConnectedLogin
export {ConnectedLogin as Login}
