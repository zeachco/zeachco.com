import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchBar from '../components/SearchBar';
import {ItemList, ItemEditor} from '../components';
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

  renderGrid() {
    const {items} = this.props;
    const {editedItem} = this.state;
    const cb = item => {
      this.setState({editedItem: item});
    };
    return (
      <div>
        <div className={editedItem && 'col-xs-7'}>
          <ItemList items={items} onSelect={cb} selected={editedItem && editedItem._id}/>
        </div>
        {editedItem && (
          <div className="col-xs-5"><ItemEditor item={editedItem}/></div>
        )}
      </div>
    );
  }

  render() {
    return (
      <Base>
        <h1>
          Inventaire&nbsp;<button className="btn btn-primary" onclick={actions.showModal()}>Ajouter un article</button>
        </h1>
        <SearchBar placeholder="nom, description, code..." searchButtonText="Rechercher" onSearch={this.onSearch}/> {this.renderGrid()}
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
