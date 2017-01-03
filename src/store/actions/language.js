import store from '..';
import {addToastMessage} from './notifications';

const {dispatch} = store;

export function setLanguage(lang) {
    try {
        require('../../i18n/' + lang);
        dispatch({type: 'SET_LANGUAGE', payload: lang});
    } catch (error) {
        addToastMessage({message: 'Unable to change language, traduction is missing', type: 'danger'});
    }
}