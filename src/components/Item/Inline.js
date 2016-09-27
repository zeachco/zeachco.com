import React from 'react'
import './style.css';

export const ItemInline = ({
  space,
  name,
  category,
  imgThumb,
  onClick,
  ...attrs
}) => (
  <div title={JSON.stringify(attrs, null, 2)}>
    <h4>
      <span className="inline-image col-sm-6" style={{
        backgroundImage: `url(${imgThumb})`,
        height: '1.5em',
        width: '3em'
      }}></span>&nbsp;<span>{name}</span>
      <span className="pull-right label label-primary">{category}</span>
    </h4>
  </div>
);
