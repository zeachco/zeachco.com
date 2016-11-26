import axios from 'axios';
import store from '..';

export function fetch() {
  store.dispatch({
    type: 'CATEGORIES_FETCH',
  });
  return axios
    .get('/api/admin/categories')
    .then(xhr => {
      store.dispatch({
        type: xhr.data ? 'CATEGORIES_FETCH_DONE' : 'CATEGORIES_FETCH_FAIL',
        payload: xhr.data
      });
    })
    .catch(data => {
      store.dispatch({
        type: 'CATEGORIES_FETCH_FAIL'
      });
    });
}