import React from 'react';

import LangSwitcher from './LangSwitcher'
import Translate from './Translate'

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <LangSwitcher />
      <hr/>
      <p className="text-muted"><Translate content="Inquiries" data={{email: 'zeachco@gmail.com'}} /></p>
    </div>
  </footer>
);

export default Footer;
