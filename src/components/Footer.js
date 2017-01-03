import React from 'react';
import { LangSwitcher, Translate } from '.';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <LangSwitcher />
      <hr/>
      <p className="text-muted"><Translate content="Inquiries" data={{email: 'zeachco@gmail.com'}} /></p>
    </div>
  </footer>
);

export {Footer};
export default Footer;
