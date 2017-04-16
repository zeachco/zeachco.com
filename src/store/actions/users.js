import axios from 'axios';
import store from '..';
import {
  browserHistory
} from 'react-router';
const {
  dispatch
} = store;

function fetch() {
  dispatch({ type: 'USER_FETCH' });
  return axios.get('/api/admin/users').then(xhr => {
    dispatch({
      type: xhr.data ? 'USER_FETCH_DONE' : 'USER_FETCH_FAIL',
      payload: xhr.data
    });
  }).catch(() => {
    dispatch({
      type: 'USER_FETCH_FAIL'
    });
  });
}

function createOrUpdate(data) {
  if(data._id) {
    dispatch({ type: 'USER_UPDATE', payload: data });
    return axios
      .put('/api/admin/users', data).then(xhr => {
        dispatch({ type: xhr.data ? 'USER_UPDATE_DONE' : 'USER_UPDATE_FAIL', payload: xhr.data });
        fetch();
      })
      .catch(xhr => dispatch({ type: 'USER_UPDATE_FAIL', payload: xhr }));
  } else {
    dispatch({ type: 'USER_CREATE', payload: data });
    return axios
      .post('/api/admin/users', data).then(xhr => {
        dispatch({ type: xhr.data ? 'USER_CREATE_DONE' : 'USER_CREATE_FAIL', payload: xhr.data });
        fetch();
      })
      .catch(xhr => dispatch({ type: 'USER_CREATE_FAIL', payload: xhr }));
  }
}

function destroy(id) {
  dispatch({
    type: 'USER_DESTROY',
    payload: id
  });
  return axios.delete('/api/users/' + id).then(xhr => {
    dispatch({
      type: xhr.data ? 'USER_DESTROY_DONE' : 'USER_DESTROY_FAIL',
      payload: xhr.data
    });
    fetch();
  }).catch(() => {
    dispatch({
      type: 'USER_DESTROY_FAIL'
    });
  });
}

function login(username, password) {
  dispatch({ type: 'USER_FETCH' });
  return axios.post('/api/login', {
    username,
    password
  }).then(xhr => {
    dispatch({
      type: 'USER_FETCH_DONE',
      payload: xhr.data
    });
  }).catch(xhr => {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload: xhr
    });
  })
}

function logout() {
  dispatch({ type: 'DISCONNECT_START' });
  return axios.delete('/api/logout').then(() => {
    dispatch({ type: 'DISCONNECT_DONE' });
    browserHistory.push('/');
  });
}

function profileUpdate(profile) {
  dispatch({ type: 'PROFILE_UPDATE_START' });
  axios.put('/api/profile/me', profile).then(data => {
    dispatch({ type: 'PROFILE_UPDATE_DONE', payload: data });
  }).catch(xhr => {
    dispatch({ type: 'PROFILE_UPDATE_FAIL', payload: xhr.data })
  });
}

module.exports = {
  fetch,
  destroy,
  createOrUpdate,
  login,
  logout,
  profileUpdate,
  editUser: userId => dispatch({ type: 'EDIT_USER', payload: userId})
};
