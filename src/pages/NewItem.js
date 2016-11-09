import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ItemForm} from '../components';
import actions from '../store/actions';
import {Base} from '.';

class NewItem extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  onSearch(text) {
    actions.items.searchItems(text);
  }

  render() {
    return (
      <Base>
        <h3>
          Création d'un article
        </h3>
        <ItemForm/>
      </Base>
    );
  }
}

const mapStatetoProps = (store, ownProps) => ({
  isAuth: store.session.isAuth,
  isLoading: store.session.isLoading,
  session: store.session,
  items: store.items || []
});

const ConnectedNewItem = connect(mapStatetoProps)(NewItem);

export {ConnectedNewItem as NewItem};
