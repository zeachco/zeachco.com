import React from 'react';
import {Logo} from './';

import {PageHeader} from 'react-bootstrap';
const Header = () => (
  <PageHeader>
    <Logo/><br/>
    <small>Une solution simple d'utilisation et de qualité.</small>
    <small>De vrai sites webs, bien contruits!</small>
  </PageHeader>
);

export default Header;
