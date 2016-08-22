import React from 'react'
import {Link} from 'react-router';
import Logo from './Logo';
import {Navbar, MenuItem, NavDropdown, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';

const TopNavbar = ({session, isLoading, isAuth}) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/"><Logo/></Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer to="/inventory">
          <NavItem>Inventaire</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        {isAuth
          ? (
            <NavDropdown title={session.firstName || session.email || session.username} id="session-dropdown">
              <LinkContainer to="/parameters">
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
    </Navbar>
  )
};

const mapStatetoProps = (store, ownProps) => ({isAuth: store.session.isAuth, isLoading: store.session.isLoading, session: store.session});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => dispatch({type: 'LOGOUT_REQUEST'})
});

export default connect(mapStatetoProps, mapDispatchToProps)(TopNavbar);
