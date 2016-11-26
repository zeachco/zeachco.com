import React, { Component } from 'react';
import { Base } from '.';

import { categories } from '../store/actions';
import { connect } from 'react-redux';

class Categories extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      categories: []
    };
  }

  componentWillMount(newprops) {
    console.log('category')
    categories.fetch();
  }

  render() {
    const {categories} = this.props;
    return (
      <Base>
        <h2>Catégories ({categories.length})</h2>
        <p>Cette liste est en lecture seule pour l'instant</p>
        {categories.map(({label, value}) => (<div key={value}>{label}</div>))}
      </Base>
    );
  }
}

const mapStatetoProps = store => ({ store: store, categories: store.categories.data });

const ConnectedCategories = connect(mapStatetoProps)(Categories);

export { ConnectedCategories as Categories };