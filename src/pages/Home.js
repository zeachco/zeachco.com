import React from 'react';
import {Button, Jumbotron, ButtonToolbar} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import {Base} from '.';

const HomePage = ({session}) => (
  <Base>
    <Jumbotron>
      <h1>Vos outils, votre site</h1>
      <h2>Simple d'utilisation, personnalisé et haute qualité</h2>
      {!session.isAuth && (
        <div>
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
      )}
    </Jumbotron>
  </Base>
);

const mapStatetoProps = (store, ownProps) => ({isAuth: store.session.isAuth, isLoading: store.session.isLoading, session: store.session});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStatetoProps, mapDispatchToProps)(HomePage);
