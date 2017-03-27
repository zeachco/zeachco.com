import React from 'react'
import {MenuItem, NavDropdown, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';

import Translate from './Translate'

const SessionDropdown = props => {
  const {session, isAuth} = props;
  return (
    <Nav pullRight>
      {isAuth
        ? (
          <NavDropdown title={session.firstName || session.email || session.username} id="session-dropdown">
            <LinkContainer to="/settings">
              <MenuItem ><Translate content="settings" /></MenuItem>
            </LinkContainer>
            <MenuItem divider/>
            <LinkContainer to="/logout">
              <MenuItem><Translate content="logout" /></MenuItem>
            </LinkContainer>
          </NavDropdown>
        )
        : ([
          {
            key: '/login',
            label: (<Translate content="login" />)
          }, {
            key: '/signup',
            label: (<Translate content="signup" />)
          }
        ].map(l => (
          <LinkContainer to={l.key} key={l.key}>
            <NavItem href="#">{l.label}</NavItem>
          </LinkContainer>
        )))}
    </Nav>
  )
};

SessionDropdown.propTypes = {
  isAuth: React.PropTypes.bool.isRequired,
  session: React.PropTypes.object.isRequired
}

const mapStatetoProps = (store, ownProps) => ({isAuth: store.session.isAuth, session: store.session, props: ownProps});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch({type: 'LOGOUT_REQUEST'})
});

export default connect(mapStatetoProps, mapDispatchToProps)(SessionDropdown);
