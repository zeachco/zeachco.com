import React from 'react'
import { Link} from 'react-router';

import ItemInline from '../components/Item/Inline';

const ItemList = ({ items }) => (
  <div className="panel panel-default">
    <div className="panel-heading">Articles trouvés: {items.length}{items.length === 100
      ? '+'
    : ''}</div>
    <div className="list-group">
      {items.map((item) => (
        <Link to={'/inventory/item/' + item._id} className="list-group-item" href="#" key={item._id}>
          <ItemInline key={item._id} {...item}/>
        </Link>
      ))}
    </div>
  </div>
);

ItemList.propTypes = {
  items: React.PropTypes.array.isRequired
}

export default ItemList
