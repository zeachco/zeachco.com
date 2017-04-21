import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from'react-router';

import Base from './Base';
import { fetch } from '../store/actions/categories';

class Categories extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      categories: []
    };
  }

  componentWillMount() {
    fetch()
  }

  render() {
    const { categories } = this.props;
    return (
      <Base>
        <h2>Catégories ({categories.length})</h2>
        <p>Cette liste est en lecture seule pour l'instant</p>
        <ul>
          {categories.map(({label, value}) => (
            <li key={value}><Link to={`/inventory/?category=${value}`}>{label}</Link></li>
          ))}
        </ul>
      </Base>
    )
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired
};

const mapStatetoProps = store => ({
  store: store,
  categories: store.categories.data
})

export default  connect(mapStatetoProps)(Categories)
