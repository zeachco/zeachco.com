import React from 'react'
import {connect} from 'react-redux'
import {ItemList, SearchBar, Translate} from '../components'
import {Link} from 'react-router'
import {Base} from '.'
import actions from '../store/actions'

const Inventory = ({items}) => (
    <Base>
        <h2>
            <Translate content="Inventory" />&nbsp;<Link className="btn btn-primary pull-right" to="/inventory/new">Ajouter un article</Link>
        </h2>
        <SearchBar
            placeholder="nom, description, code..."
            searchButtonText="Rechercher"
            onSearch={actions.items.searchItems}/>
        <hr/>
        <ItemList items={items}/>
    </Base>
)

const mapStatetoProps = (store, ownProps) => ({
    items: store.items || []
})

const ConnectedInventory = connect(mapStatetoProps)(Inventory)

export {ConnectedInventory as Inventory}
