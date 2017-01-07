import React from 'react'
import {Button, Jumbotron, ButtonToolbar} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {connect} from 'react-redux'
import { Base } from '.'
import { Translate } from '../components';
import actions from '../store/actions'

const LoggedOut = () => (
  <div className="row">
    <div className="col-md-6">
      <h3><Translate content="login_to_manage_text" /></h3>
      <ButtonToolbar>
        <LinkContainer to="signup">
          <Button bsStyle="success"><Translate content="signup" /></Button>
        </LinkContainer>
        <LinkContainer to="login">
          <Button bsStyle="primary"><Translate content="login" /></Button>
        </LinkContainer>
      </ButtonToolbar>
    </div>
    <div className="col-md-6">
      <h3><Translate content="login_with_demo_text" /></h3>
      <Button
        onClick={e => actions
        .session
        .login('demo', 'demo')}
        bsStyle="default"><Translate content="demo_account"/></Button>
    </div>
  </div>
)

const Home = ({isAuth}) => (
  <Base>
    <Jumbotron>
      <h1><Translate content="HomeHeaderH1"/></h1>
      <h2><Translate content="HomeHeaderH2"/></h2>
      {!isAuth && (<LoggedOut/>)}
    </Jumbotron>
  </Base>
)

const mapStatetoProps = (store, ownProps) => ({isAuth: store.session.isAuth, isLoading: store.session.isLoading})

const ConnectedHome = connect(mapStatetoProps)(Home)

export {ConnectedHome as Home}
