import React from 'react'
import {Link} from 'react-router';
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import SessionDropdown from './SessionDropdown'
import Logo from './Logo'
import Translate from './Translate'

const TopNav = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/"><Logo/></Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/users">
        <NavItem><Translate content="users"/></NavItem>
      </LinkContainer>
      <LinkContainer to="/categories">
        <NavItem><Translate content="categories"/></NavItem>
      </LinkContainer>
      <LinkContainer to="/inventory">
        <NavItem><Translate content="inventory"/></NavItem>
      </LinkContainer>
    </Nav>
    <SessionDropdown/>
  </Navbar>
);

export default TopNav
