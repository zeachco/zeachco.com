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
      <h3>Connectez-vous pour administrer vos sites</h3>
      <ButtonToolbar>
        <LinkContainer to="signup">
          <Button bsStyle="success">inscription</Button>
        </LinkContainer>
        <LinkContainer to="login">
          <Button bsStyle="primary">connexion</Button>
        </LinkContainer>
      </ButtonToolbar>
    </div>
    <div className="col-md-6">
      <h3>Voir les fonctionnalitées sans créer de compte (oui c'est possible)</h3>
      <Button
        onClick={e => actions
        .session
        .login('demo', 'demo')}
        bsStyle="default">Compte demo</Button>
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
