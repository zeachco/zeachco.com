import React from 'react';
import axios from 'axios';
import Item from '../components/item';
import store from '../core/store';

class ProductPage extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    this.refresh();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params !== this.props.params) {
      this.refresh();
    }
  }
  refresh() {
    if (!this.state.loading) {
      this.setState({loading: true});
      axios.get('/api/items').then(data => {
        this.setState({'items': data, loading: false});
        store.set('items', data);
      });
    }
  }
  render() {
    return (
      <div>
        <div id="item_list" style={{
          opacity: this.state.loading
          ? .5
          : 1
        }}>
          {this.state.items.map(i => (<Item key={i._id} {...i}/>))}
          <pre>{JSON.stringify({
            query: this.props.params,
            items: this.state.items
          }, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

export default ProductPage;
