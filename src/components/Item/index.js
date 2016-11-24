import React from 'react'
import './style.css';

export * from './Inline';
export * from './Editor';
export * from './ItemForm';

export const Item = ({
  space,
  name,
  imgThumb,
  onClick,
  ...attrs
}) => (
  <tr title={JSON.stringify(attrs, null, 2)} onClick={onClick}>
    <th className="inline-image" style={{
        backgroundImage: `url(${imgThumb})`
      }}>
    </th>
    <td>{name}</td>
    <td>{space}</td>
  </tr>
);