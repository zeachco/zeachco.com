import axios from 'axios';
import store from '.';
import {addToastMessage} from './actions/notifications';
// import {browserHistory} from 'react-router';

axios
    .interceptors
    .response
    .use(response => Promise.resolve(response), err => {
        const {status} = err.response;
        if (status === 403 || status === 401) {
            store.dispatch({type: 'SESSION_LOGIN_FAIL'});
            addToastMessage({message: 'Veuillez vous reconnecter', type: 'danger'});
        } else {
            addToastMessage({message: 'Une erreur est survenue', type: 'danger'});
        }
        return Promise.reject(err);
    });

export function fetchUserSession() {
    store.dispatch({type: 'SESSION_FETCH_START'});
    return axios.get('/api/profile/me').then(xhr => {
            store.dispatch({
                type: 'SESSION_FETCH_DONE',
                payload: xhr.data
            });
            addToastMessage({message: 'Session récupérée', type: 'success'});
        })
        .catch(() => {
            store.dispatch({type: 'SESSION_FETCH_FAIL'});
            addToastMessage({message: 'impossible de récupérée la session', type: 'danger'});
        });
}

export function fetchCategories() {
    store.dispatch({type: 'CATEGORIES_SEARCH_START'});
    axios.get('/api/admin/categories')
        .then(xhr => store.dispatch({
            type: 'CATEGORIES_SEARCH_DONE',
            payload: xhr.data
        }))
        .catch(() => store.dispatch({type: 'CATEGORIES_SEARCH_FAIL'}));
}

export function fetchSpaces() {
    store.dispatch({type: 'SPACES_SEARCH_START'});
    axios.get('/api/admin/spaces')
        .then(xhr => store.dispatch({
            type: 'SPACES_SEARCH_DONE',
            payload: xhr.data
        }))
        .catch(() => store.dispatch({type: 'SPACES_SEARCH_FAIL'}));
}

export function bootstrap() {
    fetchUserSession()
        .then(() => fetchSpaces())
        .then(() => fetchCategories());
}

export function updateForm(path, value) {
    store.dispatch({
        type: 'UPDATE_FORM_STATE',
        payload: { path, value }
    });
}
