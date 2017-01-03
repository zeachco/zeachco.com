import React from 'react';
import { LangSwitcher } from '.';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p className="text-muted">Pour toutes questions &nbsp;<a href="mailto:info@zeachco.com">info@zeachco.com</a>.
      </p>
      <hr/>
      <LangSwitcher />
    </div>
  </footer>
);

export {Footer};
export default Footer;
