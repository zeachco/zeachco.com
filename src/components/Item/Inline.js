import React from 'react'
import './style.css';

export const ItemInline = ({
  _id,
  space,
  name,
  labels,
  files = [],
  ...attrs
}) => (
  <div>
    <h4>
      <span
        className="inline-image col-sm-6"
        style={{
        backgroundImage: `url(${files[0]}/thumb)`,
        height: '1.5em',
        width: '3em'
      }}></span>&nbsp;<span>{name}</span>
    </h4>
    <p>{labels && labels.join(', ')}</p>
  </div>
);
