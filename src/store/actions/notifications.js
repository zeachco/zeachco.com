import store from '..';

let messageId = 0;

function removeToastMessage(id) {
    store.dispatch({type: 'REMOVE_TOAST_MESSAGE', payload: id});
}

/**
 * contains `type` `message` and `time` as optionnal params
 * @param {Object} messageObject
 */
function addToastMessage(messageObject) {
    messageObject.time = messageObject.time || 4000;
    messageObject.expire = Date.now() + messageObject.time;
    messageObject.messageId = messageId++;
    if (messageId > 999999) {
        messageId = 0;
    }
    store.dispatch({type: 'ADD_TOAST_MESSAGE', payload: messageObject});
    setTimeout(removeToastMessage, messageObject.time + 10, messageId);
}

module.exports = {
    addToastMessage,
    removeToastMessage
};
