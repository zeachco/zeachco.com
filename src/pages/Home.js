import React from 'react'
import { Button, Jumbotron, ButtonToolbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'

import Base from './Base'
import Translate from '../components/Translate';
import { login } from '../store/actions/session'

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
        onClick={() => login('demo', 'demo')}
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
);

Home.propTypes = {
  isAuth: React.PropTypes.bool.isRequired
};

const mapStatetoProps = (store) => ({
  isAuth: store.get('old').session.isAuth,
  isLoading: store.get('old').session.isLoading
});

export default connect(mapStatetoProps)(Home);
