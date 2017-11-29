import React from 'react';
import LinkedInIcon from 'react-icons/lib/fa/linkedin-square'

import LangSwitcher from './LangSwitcher'
import Translate from './Translate'

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <LangSwitcher />
      <hr/>
      <p className="text-muted">
        <Translate content="Inquiries" data={{email: 'info@zeachco.com'}} />
        <a className="pull-right" href="//www.linkedin.com/in/zeachco"><LinkedInIcon />{' '}linkedin.com/in/zeachco</a>
      </p>
    </div>
  </footer>
);

export default Footer;
