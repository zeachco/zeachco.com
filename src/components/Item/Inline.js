import React from 'react'

import './style.css';

const ItemInline = ({
  space,
  name,
  labels,
  files = []
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
        <br />
        <small>
          <span className="label label-primary">{space}</span>
          {labels.map(label => (<span> <span className="label label-info">{label}</span></span>))}
        </small>
      </h4>
  </div>
);

ItemInline.propTypes = {
  space: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  labels: React.PropTypes.array.isRequired,
  files: React.PropTypes.array.isRequired
};

export default ItemInline

