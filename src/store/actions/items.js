import bridge from '../../core/bridge';
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
  bridge.get('/api/items/search/' + text).then(data => {
    dispatch({
      type: 'SEARCH_ITEMS_DONE',
      payload: data
    });
  })
}

module.exports = {
  searchItems
};
