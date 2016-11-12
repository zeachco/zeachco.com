import React from 'react'
import {ItemInline} from '../components';
import {Link} from 'react-router';

export const ItemList = ({items}) => (
  <div className="panel panel-default">
    <div className="panel-heading">Articles trouvés: {items.length}{items.length === 100
      ? '+'
    : ''}</div>
    <div className="list-group">
      {items.map((item, i) => (
        <Link to={'/inventory/item/' + item._id} className="list-group-item" href="#" key={item._id}>
          <ItemInline key={item._id} {...item}/>
        </Link>
      ))}
    </div>
  </div>
);
