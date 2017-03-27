import store from '..';
import { addToastMessage } from './notifications';

export function setLanguage(lang) {
    try {
        require('../../i18n/' + lang);
        store.dispatch({type: 'SET_LANGUAGE', payload: lang});
    } catch (error) {
        addToastMessage({message: 'Unable to change language, traduction is missing', type: 'danger'});
    }
}
