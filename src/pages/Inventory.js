import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import ItemList from '../components/ItemList'
import SearchBar from '../components/SearchBar'
import Translate from '../components/Translate'
import Base from './Base'
import { searchItems } from '../store/actions/items'

const Inventory = ({ items }) => (
    <Base>
        <h2>
            <Translate content="inventory" />&nbsp;<Link className="btn btn-primary pull-right" to="/inventory/new"><Translate content="add_an_item" /></Link>
        </h2>
        <SearchBar
            placeholder="nom, description, code..."
            searchButtonText={(<Translate content="search" />)}
            onSearch={searchItems}
        />
        <hr/>
        <ItemList items={items}/>
    </Base>
);

Inventory.propTypes = {
    items: React.PropTypes.array.isRequired
}

const mapStatetoProps = (store) => ({
    items: store.items || []
});

export default connect(mapStatetoProps)(Inventory)
