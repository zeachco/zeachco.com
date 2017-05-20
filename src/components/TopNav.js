import React, {PropTypes} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import SessionDropdown from './SessionDropdown'
import Logo from './Logo'
import Translate from './Translate'

const TopNav = ({
  // userRoles,
  itemsCount,
  categoriesCount,
  spacesCount
  // isSuperuser
}) => {
  const NavHeaderLink = ({name, path, icon = '', children}) => {
    // const haveRoles = 
    // if(!isAuth || !roles.contains(userRoles) && !isSuperuser) return null;
    return (
      <LinkContainer to={`/${path || name}`}>
        <NavItem>
          <span className={`glyphicon glyphicon-${icon}`}></span>&nbsp;&nbsp;&nbsp;
          <Translate content={name} />
          {children}
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
        <NavHeaderLink icon="globe" name="spaces" roles="admin, sites">{spacesCount ? ` (${spacesCount})` : null}</NavHeaderLink>
        <NavHeaderLink icon="user" name="users" roles="admin, users"/>
        <NavHeaderLink icon="tag" name="categories" roles="admin, categories">{categoriesCount ? ` (${categoriesCount})` : null}</NavHeaderLink>
        <NavHeaderLink icon="th-list" name="inventory" roles="admin, items">{itemsCount ? ` (${itemsCount})` : null}</NavHeaderLink>
      </Nav>
      <SessionDropdown/>
    </Navbar>
  )
};

TopNav.propTypes = {
  userRoles: PropTypes.object.isRequired,
  isSuperuser: PropTypes.bool,
  itemsCount: PropTypes.number,
  categoriesCount: PropTypes.number,
  spacesCount: PropTypes.number
}

const mapStateToProps = state => ({
  userRoles: state.getIn('currentUser.roles'),
  isSuperuser: state.getIn('currentUser.isSuperuser'),
  itemsCount: state.getIn('inventory.searchResults').length,
  categoriesCount: state.getIn('categories.searchResults').length,
  spacesCount: state.getIn('currentUser.spaces').length
});

export default connect(mapStateToProps)(TopNav);
