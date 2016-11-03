import axios from 'axios';
import store from '..';

const {dispatch} = store;

function searchItems(text) {
    if (!text) {
        return dispatch({type: 'SEARCH_ITEMS_DONE', payload: []});
    }
    dispatch({type: 'SEARCH_ITEMS_START'});
    axios.get('/api/admin/items/search/' + text).then(xhr => {
        dispatch({type: 'SEARCH_ITEMS_DONE', payload: xhr.data});
    });
}

function createOrUpdate(item) {
    if (item._id) {
        dispatch({type: 'UPDATE_ITEM_START'});
        axios.put('/api/admin/items', item).then(xhr => {
            dispatch({type: 'UPDATE_ITEM_DONE', payload: xhr.data});
        });
    } else {
        dispatch({type: 'CREATE_ITEM_START'});
        axios.post('/api/admin/items', item).then(xhr => {
            dispatch({type: 'CREATE_ITEM_DONE', payload: xhr.data});
        });
    }
}

module.exports = {
    searchItems,
    createOrUpdate
};
