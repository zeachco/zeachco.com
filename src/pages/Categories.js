import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from'react-router';

import Base from './Base';
import { fetch } from '../store/actions/categories';
import itemsActions from '../store/actions/items';

fetch();

const Categories = ({
  categories
}) => {
  return (
    <Base>
      <h2>Catégories ({categories.length})</h2>
      <p>Cette liste est en lecture seule pour l'instant</p>
      <ul>
        {categories.map(({label, value}) => (
          <li key={value}><Link onClick={() => itemsActions.search({ category: value })} to={`/inventory/?category=${value}`}>{label}</Link></li>
        ))}
      </ul>
    </Base>
  );
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired
};

const mapStatetoProps = store => ({
  categories: store.get('old').categories.data
})

export default  connect(mapStatetoProps)(Categories)
