const firebaseRef = {};
import {
  store
}
from 'store';
import {
  category
} from './models';

export const SESSION_REQUEST_CONNECT = 'SESSION_REQUEST_CONNECT';
export const SESSION_REQUEST_DISCONNECT = 'SESSION_REQUEST_DISCONNECT';
export const SESSION_ON_CONNECT = 'SESSION_ON_CONNECT';
export const SESSION_ON_DISCONNECT = 'SESSION_ON_DISCONNECT';
export const COMPANY_START_LOAD = 'COMPANY_START_LOAD';
export const COMPANY_ON_LOAD = 'COMPANY_ON_LOAD';
export const COMPANY_CHANGE_KEY = 'COMPANY_CHANGE_KEY';
export const CATEGORIES_START_LOAD = 'CATEGORIES_START_LOAD';
export const CATEGORIES_ON_LOAD = 'CATEGORIES_ON_LOAD';
export const CATEGORIES_SET = 'CATEGORIES_SET';
export const CATEGORIES_CHANGE_KEY = 'CATEGORIES_CHANGE_KEY';
export const PRODUCTS_START_LOAD = 'PRODUCTS_START_LOAD';
export const PRODUCTS_ON_LOAD = 'PRODUCTS_ON_LOAD';
export const PRODUCTS_SET = 'PRODUCTS_SET';
export const PRODUCTS_CHANGE_KEY = 'PRODUCTS_CHANGE_KEY';

export const sessionRequestConnect = (email, password) => {
  firebaseRef.authWithPassword({
    email,
    password
  });
  return {
    type: SESSION_REQUEST_CONNECT
  }
}
export const sessionRequestDisconnect = () => {
  firebaseRef.unauth();
  return {
    type: SESSION_REQUEST_DISCONNECT
  }
}
export const sessionOnAuth = (session) => {
  return {
    type: session ? SESSION_ON_CONNECT : SESSION_ON_DISCONNECT,
    payload: session
  }
}

export const loadCompany = () => {
  let uid = store.getState().session.auth.uid;
  firebaseRef.child('companies').child(uid).on('value', (snap) => {
    store.dispatch({
      type: COMPANY_ON_LOAD,
      payload: snap.val()
    })
  });
  return {
    type: COMPANY_START_LOAD
  }
}

// CATEGORIES
export const loadCategories = () => {
  let uid = store.getState().session.auth.uid;
  firebaseRef.child('categories').child(uid).on('value', (snap) => {
    store.dispatch({
      type: CATEGORIES_ON_LOAD,
      payload: snap.val()
    })
  });
  return {
    type: CATEGORIES_START_LOAD
  }
}

export const addCategory = (model = category) => {
  let uid = store.getState().session.auth.uid;
  firebaseRef.child('categories').child(uid).push(model);
  return {
    type: CATEGORIES_SET
  }
}

export const removeCategory = (uid) => {
  let uuid = store.getState().session.auth.uid;
  firebaseRef.child('categories').child(uuid).child(uid).remove();
  return {
    type: CATEGORIES_SET
  }
}

export const updateCategory = (uid, key, value) => {
  let uuid = store.getState().session.auth.uid;
  firebaseRef.child('categories').child(uuid).child(uid).child(key.split(/\./).join('/')).set(value);
  return {
    type: CATEGORIES_SET
  }
}

export const changeCompanyAttribute = (key, value) => {
  let state = store.getState();
  if (state.session) {
    firebaseRef.child('companies').child(state.session.auth.uid).child(key.split(/\./).join('/')).set(value);
  }
  return {
    type: COMPANY_CHANGE_KEY,
    payload: {
      key,
      value
    }
  }
}

// PRODUCTS


export const loadProducts = () => {
  let uid = store.getState().session.auth.uid;
  firebaseRef.child('products').child(uid).on('value', (snap) => {
    store.dispatch({
      type: PRODUCTS_ON_LOAD,
      payload: snap.val()
    })
  });
  return {
    type: PRODUCTS_START_LOAD
  }
}

export const addProduct = (model = category) => {
  let uid = store.getState().session.auth.uid;
  firebaseRef.child('products').child(uid).push(model);
  return {
    type: PRODUCTS_SET
  }
}

export const removeProduct = (uid) => {
  let uuid = store.getState().session.auth.uid;
  firebaseRef.child('products').child(uuid).child(uid).remove();
  return {
    type: PRODUCTS_SET
  }
}

export const updateProduct = (uid, key, value) => {
  let uuid = store.getState().session.auth.uid;
  firebaseRef.child('products').child(uuid).child(uid).child(key.split(/\./).join('/')).set(value);
  return {
    type: PRODUCTS_SET
  }
}
