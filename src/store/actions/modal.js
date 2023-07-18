import store from '..';

export function showModal(opt) {
  store.dispatch({ type: 'MODAL_SHOW', payload: opt });
}

export function hideModal() {
  store.dispatch({ type: 'MODAL_HIDE' });
}
