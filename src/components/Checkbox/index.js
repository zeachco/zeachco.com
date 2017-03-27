import './Checkbox.scss';

import React from 'react';
import cx from 'classnames';

const Checkbox = ({checked, onChange, children, className = ''}) => (
  <a href onClick={e => {
    e.preventDefault();
    onChange(!checked);
  }} className={cx(className, 'checkbox_component', {checked})}>
    {children}
  </a>
);

Checkbox.propTypes = {
  checked: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
  className: React.PropTypes.string
};

export default Checkbox

