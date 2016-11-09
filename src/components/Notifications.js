import React from 'react';
import {connect} from 'react-redux';
import {Notification} from '.';

const style = {
    position: 'fixed',
    display: 'block',
    bottom: 0,
    left: '1%',
    maxWidth: '98%',
    zIndex: 9
};

function filterByDate(notif) {
    return notif.expire > Date.now();
}

const Notifications = ({notifications}) => (
    <div style={style}>{notifications.filter(filterByDate).filter((n, i) => i < 5).map(n => (<Notification key={n.messageId} data={n}/>))}</div>
);

const mapStatetoProps = (store, ownProps) => ({notifications: store.notifications});

const ConnectedNotifications = connect(mapStatetoProps)(Notifications);

export {ConnectedNotifications as Notifications};
