import store from '..';
import {addToastMessage} from './notifications';
require('../../i18n/fr');

const {dispatch} = store;

export function setLanguage(lang) {
    dispatch({type: 'SET_LANGUAGE', payload: lang});
    const I18N = require('../../i18n/' + lang);
    addToastMessage({message: I18N['switched_to_this_language']});
}