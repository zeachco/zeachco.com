import axios from 'axios';
import store from '..';
import {addToastMessage} from './notifications';
import {browserHistory} from 'react-router';

axios
    .interceptors
    .response
    .use(function (response) {
        return Promise.resolve(response);
    }, function (err) {
        const {status} = err.response;
        if (status === 403 || status === 401) {
            store.dispatch({type: 'SESSION_LOGIN_FAIL'});
            addToastMessage({message: 'Veuillez vous reconnecter', type: 'danger'});
        } else {
            console.error(err);
            addToastMessage({message: 'Une erreur est survenue', type: 'danger'});
        }
        return Promise.reject(err);
    });

function fetch() {
    store.dispatch({type: 'SESSION_FETCH'});
    return axios
        .get('/api/profile/me')
        .then(xhr => {
            store.dispatch({
                type: xhr.data
                    ? 'SESSION_FETCH_DONE'
                    : 'SESSION_FETCH_FAIL',
                payload: xhr.data
            });
            console.warn('Session récupéré');
            // addToastMessage({message: 'Session récupérée', type: 'success'});
        })
        .catch(data => {
            store.dispatch({type: 'SESSION_FETCH_FAIL'});
            addToastMessage({message: 'impossible de récupérée la session', type: 'danger'});
        });
}

function login(username, password) {
    store.dispatch({type: 'SESSION_FETCH'});
    addToastMessage({message: 'Connexion...'});
    return axios
        .post('/api/login', {username, password})
        .then(xhr => {
            addToastMessage({
                message: 'Bienvenue ' + xhr.data.firstName,
                type: 'success'
            });
            store.dispatch({type: 'SESSION_FETCH_DONE', payload: xhr.data});
        })
        .catch(xhr => {
            addToastMessage({message: 'Authentification échouée', type: 'danger'});
            store.dispatch({type: 'SESSION_LOGIN_FAIL', payload: xhr});
        })
}

function logout() {
    store.dispatch({type: 'DISCONNECT_START'});
    return axios
        .delete('/api/logout')
        .then(() => {
            store.dispatch({type: 'DISCONNECT_DONE'});
            browserHistory.push('/')
        });
}

function profileUpdate(profile) {
    store.dispatch({type: 'PROFILE_UPDATE_START'});
    axios
        .put('/api/profile/me', profile)
        .then(xhr => {
            store.dispatch({type: 'SESSION_FETCH_DONE', payload: xhr.data});
        })
        .catch(xhr => {
            store.dispatch({type: 'SESSION_LOGIN_FAIL', payload: xhr});
        })
}

module.exports = {
    fetch,
    login,
    logout,
    profileUpdate
};