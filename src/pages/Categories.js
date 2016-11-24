import React, {
  Component
} from 'react';
import {
  Base
} from '.';
import axios from 'axios';

export class Categories extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      categories: []
    };
  }

  componentWillMount(newprops) {
    this.setState({
      loading: true
    });
    axios
      .get('/api/admin/categories')
      .then(xhr => {
        this.setState({
          categories: xhr.data,
          loading: false
        });
      }).catch(error => {
        this.setState({
          loading: false
        });
      });
  }

  render() {
    const {categories} = this.state;
    return (
      <Base>
        <h2>Catégories ({categories.length})</h2>
        <p>Cette liste est en lecture seule pour l'instant</p>
        {categories.map(({label, value}) => (<div key={value}>{label}</div>))}
      </Base>
    );
  }
}