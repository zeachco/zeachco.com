import React from 'react'
import {ItemInline} from '../components';

export const ItemList = ({items, onSelect}) => {
  const cb = item => ev => {
    ev.preventDefault();
    onSelect(item);
  }
  return (
    <div className="panel panel-default">
      <div className="panel-heading">Articles trouvés: {items.length}{items.length === 100
          ? '+'
          : ''}</div>
      <div className="list-group">
        {items.map((item, i) => (
          <a className="list-group-item" href="#" key={item._id} onClick={cb(item)}>
            <ItemInline key={item._id} {...item}/>
          </a>
        ))}
      </div>
    </div>
  )
};
