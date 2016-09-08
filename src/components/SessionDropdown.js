import React from 'react'
import {MenuItem, NavDropdown, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';

const SessionDropdown = props => {
  const {session, isAuth} = props;
  return (
    <Nav pullRight>
      {isAuth
        ? (
          <NavDropdown title={session.firstName || session.email || session.username} id="session-dropdown">
            <LinkContainer to="/settings">
              <MenuItem >Paramètres</MenuItem>
            </LinkContainer>
            <MenuItem divider/>
            <LinkContainer to="/logout">
              <MenuItem>Déconnexion</MenuItem>
            </LinkContainer>
          </NavDropdown>
        )
        : ([
          {
            key: '/login',
            label: 'Connexion'
          }, {
            key: '/signup',
            label: 'Inscription'
          }
        ].map(l => (
          <LinkContainer to={l.key} key={l.key}>
            <NavItem href="#">{l.label}</NavItem>
          </LinkContainer>
        )))}
    </Nav>
  )
};

const mapStatetoProps = (store, ownProps) => ({isAuth: store.session.isAuth, session: store.session, props: ownProps});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => dispatch({type: 'LOGOUT_REQUEST'})
});

const ConnectedSessionDropdown = connect(mapStatetoProps, mapDispatchToProps)(SessionDropdown);

export {ConnectedSessionDropdown as SessionDropdown};
