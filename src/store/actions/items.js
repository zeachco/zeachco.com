import axios from 'axios';
import store from '..';

const {
  dispatch
} = store;

function searchItems(text) {
  if (!text) {
    return dispatch({
      type: 'SEARCH_ITEMS_DONE',
      payload: []
    });
  }
  dispatch({
    type: 'SEARCH_ITEMS_START'
  });
  axios.get('/api/admin/items/search/' + text).then(xhr => {
    dispatch({
      type: 'SEARCH_ITEMS_DONE',
      payload: xhr.data
    });
  })
}

module.exports = {
  searchItems
};
