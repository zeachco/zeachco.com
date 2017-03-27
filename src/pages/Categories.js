import React, { Component, PropTypes } from 'react'
import Base from './Base'

import { fetch } from '../store/actions/categories'
import { connect } from 'react-redux'

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
        {categories.map(({label, value}) => (<div key={value}>{label}</div>))}
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
