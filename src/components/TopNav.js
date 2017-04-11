import React, {PropTypes} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import SessionDropdown from './SessionDropdown'
import Logo from './Logo'
import Translate from './Translate'

const TopNav = ({isAuth}) => {
  const NavHeaderLink = ({name, path, roles, icon = ''}) => {
    if(!isAuth || !roles) return null;
    return (
      <LinkContainer to={`/${path || name}`}>
        <NavItem>
          <span className={`glyphicon glyphicon-${icon}`}></span>&nbsp;&nbsp;&nbsp;
          <Translate content={name} />
        </NavItem>
      </LinkContainer>
    );
  };

  NavHeaderLink.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    roles: PropTypes.string,
    path: PropTypes.string
  }

  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/"><Logo/></Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavHeaderLink icon="globe" name="spaces" roles="admin, sites"/>
        <NavHeaderLink icon="user" name="users" roles="admin, users"/>
        <NavHeaderLink icon="tag" name="categories" roles="admin, categories"/>
        <NavHeaderLink icon="th-list" name="inventory" roles="admin, items"/>
      </Nav>
      <SessionDropdown/>
    </Navbar>
  )
};

TopNav.propTypes = {
  isAuth: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuth: state.session.isAuth
});

export default connect(mapStateToProps)(TopNav);
