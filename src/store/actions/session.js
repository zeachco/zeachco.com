import bridge from '../../core/bridge';
import store from '..';
import {browserHistory} from 'react-router';
const {dispatch} = store;

function fetch() {
  dispatch({
    type: 'SESSION_FETCHING',
  });
  return bridge.get('/api/profile/me').then(data => {
    dispatch({
      type: 'SESSION_FETCHED',
      payload: data
    });
  }).catch(data => {
    dispatch({
      type: 'SESSION_FETCHED'
    });
  });
}

function login(username, password) {
  dispatch({
    type: 'SESSION_FETCHING',
  });
  return bridge.post('/api/login', {
    username,
    password
  }).then(data => {
    dispatch({
      type: 'SESSION_FETCHED',
      payload: data
    });
  })
}

function logout() {
  dispatch({
    type: 'DISCONNECT_START',
  });
  return bridge.delete('/api/logout').then(() => {
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
  bridge.put('/api/profile/me', profile).then(data => {
    dispatch({
      type: 'PROFILE_UPDATE_DONE',
      payload: data
    });
  })
}

module.exports = {
  fetch,
  login,
  logout,
  profileUpdate
};
