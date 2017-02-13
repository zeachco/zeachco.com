import axios from 'axios';
import store from '..';
import {addToastMessage} from './notifications';
import {browserHistory} from 'react-router';

const {dispatch} = store;

function searchItems({search='_', visible}) {
    // if (!search) return dispatch({ type: 'SEARCH_ITEMS_DONE', payload: [] });
    dispatch({ type: 'SEARCH_ITEMS_START' });
    axios.get(`/api/admin/items/search/${search}`, {params : {visible}}).then(xhr => {
        dispatch({ type: 'SEARCH_ITEMS_DONE', payload: xhr.data });
        addToastMessage({ message: `${xhr.data.length} articles trouvés` });
    });
}

function error(xhr) {
    addToastMessage({message: xhr.message, type: 'danger'});
    if (xhr.response && xhr.response.data && xhr.response.data.errors) {
        for (var err in xhr.response.data.errors) {
            if (xhr.response.data.errors.hasOwnProperty(err)) {
                var error = xhr.response.data.errors[err];
                addToastMessage({message: error.message, type: 'danger'});
            }
        }
    }
}

function createOrUpdate(item) {
    if (item._id) {
        dispatch({type: 'UPDATE_ITEM_START'});
        axios.put('/api/admin/item/' + item._id, item).then(xhr => {
            dispatch({type: 'UPDATE_ITEM_DONE', payload: xhr.data});
            addToastMessage({
                message: `article ${xhr.data.name || xhr.data._id} enregistré`,
                type: 'success'
            });
        }).catch(error);
    } else {
        dispatch({type: 'CREATE_ITEM_START'});
        axios.post('/api/admin/items', item).then(xhr => {
            dispatch({type: 'CREATE_ITEM_DONE', payload: xhr.data});
            addToastMessage({
                message: `article ${xhr.data.name || xhr.data._id} créé`,
                type: 'success'
            });
            browserHistory.push('/inventory/item/'+xhr.data._id);
        }).catch(error);
    }
}

module.exports = {
    searchItems,
    createOrUpdate
};
