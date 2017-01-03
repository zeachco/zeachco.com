import store from '..';
import {addToastMessage} from './notifications';

const {dispatch} = store;

export function setLanguage(lang) {
    try {
        const I18N = require('../../i18n/' + lang);
        addToastMessage({message: I18N['switched_to_this_language']});
        dispatch({type: 'SET_LANGUAGE', payload: lang});
    } catch (error) {
        addToastMessage({message: 'Unable to change language, traduction is missing', type: 'danger'});
    }
}