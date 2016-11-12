import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchBar from '../components/SearchBar';
import {ItemList, ItemEditor} from '../components';
import actions from '../store/actions';
import {Link} from 'react-router';
import {Base} from '.';

const Inventory = ({items}) => (
    <Base>
        <h2>Inventaire&nbsp;<Link className="btn btn-primary pull-right" to="/inventory/new">Ajouter un article</Link></h2>
        <SearchBar placeholder="nom, description, code..." searchButtonText="Rechercher" onSearch={actions.items.searchItems}/>
        <hr/>
        <ItemList items={items}/>
    </Base>
);

const mapStatetoProps = (store, ownProps) => ({
    items: store.items || []
});

const ConnectedInventory = connect(mapStatetoProps)(Inventory);

export {ConnectedInventory as Inventory};
