import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchBar from '../components/SearchBar';
import ItemEditor from '../components/ItemEditor';
import actions from '../store/actions';
import {Base} from '.';

class HomePage extends Component {
  render() {
    const {items} = this.props;
    const onSearch = text => {
      actions.items.searchItems(text);
    }

    return (
      <Base>
        <h1>
          Inventaire
        </h1>
        <SearchBar placeholder="nom, description, code..." searchButtonText="Rechercher" onSearch={onSearch}/>
        <p>Articles trouvés: {items.length}{items.length === 100
            ? '+'
            : ''}</p>
        {items.map((item, i) => <ItemEditor key={item._id} item={item}/>)}
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

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStatetoProps, mapDispatchToProps)(HomePage);
