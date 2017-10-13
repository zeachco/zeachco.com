import axios from 'axios';
import store from '..';
import {addToastMessage} from './notifications';
import {browserHistory} from 'react-router';

const {dispatch} = store;

export function searchItems({search = '_', visible, space}) {
    // if (!search) return dispatch({ type: 'SEARCH_ITEMS_DONE', payload: [] });
    dispatch({ type: 'SEARCH_ITEMS_START' });
    axios.get(`/api/admin/items/search/${search || '_'}`, { params: { visible, space } }).then(xhr => {
        dispatch({ type: 'SEARCH_ITEMS_DONE', payload: xhr.data });
        addToastMessage({ message: `${xhr.data.length} articles trouvés` });
    });
}

function error(xhr) {
    addToastMessage({message: xhr.message, type: 'danger'});
    if (xhr.response && xhr.response.data && xhr.response.data.errors) {
        for (var err in xhr.response.data.errors) {
            if (xhr.response.data.errors.hasOwnProperty(err)) {
                var e = xhr.response.data.errors[err];
                addToastMessage({message: e.message, type: 'danger'});
            }
        }
    }
}

export function createOrUpdate(item) {
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
            browserHistory.push('/inventory/item/' + xhr.data._id);
        }).catch(error);
    }
}
