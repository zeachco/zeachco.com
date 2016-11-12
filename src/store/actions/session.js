import axios from 'axios';
import store from '..';
import {addToastMessage} from './notifications';
import {
  browserHistory
} from 'react-router';
const {
  dispatch
} = store;

function fetch() {
  dispatch({
    type: 'SESSION_FETCH',
  });
  return axios.get('/api/profile/me').then(xhr => {
    dispatch({
      type: xhr.data ? 'SESSION_FETCH_DONE' : 'SESSION_FETCH_FAIL',
      payload: xhr.data
    });
    addToastMessage({message: 'Session récupérée', type: 'success'});
  }).catch(data => {
    dispatch({
      type: 'SESSION_FETCH_FAIL'
    });
    addToastMessage({message: 'impossible de récupérée la session', type: 'danger'});
  });
}

function login(username, password) {
  dispatch({
    type: 'SESSION_FETCH',
  });
  return axios.post('/api/login', {
    username,
    password
  }).then(xhr => {
    dispatch({
      type: 'SESSION_FETCH_DONE',
      payload: xhr.data
    });
  }).catch(xhr => {
    dispatch({
      type: 'SESSION_LOGIN_FAIL',
      payload: xhr
    });
  })
}

function logout() {
  dispatch({
    type: 'DISCONNECT_START',
  });
  return axios.delete('/api/logout').then(() => {
    dispatch({
      type: 'DISCONNECT_DONE',
    });
    browserHistory.push('/')
  });
}

function profileUpdate(profile) {
  dispatch({
    type: 'PROFILE_UPDATE_START'
  });
  axios.put('/api/profile/me', profile).then(xhr => {
    dispatch({
      type: 'SESSION_FETCH_DONE',
      payload: xhr.data
    });
  }).catch(xhr => {
    dispatch({
      type: 'SESSION_LOGIN_FAIL',
      payload: xhr
    });
  })
}

module.exports = {
  fetch,
  login,
  logout,
  profileUpdate
};
