import React from 'react';
import {connect} from 'react-redux';

import Notification from './Notification';

const style = {
    position: 'fixed',
    display: 'block',
    bottom: 0,
    left: '1%',
    maxWidth: '90%',
    zIndex: 9
};

const filterByDate = notif => notif.expire > Date.now();
const filter5Firsts = (n, i) => i < 5;
const mapNotif = n => <Notification key={n.messageId} data={n} />;
const Notifications = ({notifications}) => <div style={style}>{notifications.filter(filterByDate).filter(filter5Firsts).map(mapNotif)}</div>;

Notifications.propTypes = {
    notifications: React.PropTypes.array.isRequired
}

const mapStatetoProps = (store) => ({notifications: store.get('old').notifications});

export default connect(mapStatetoProps)(Notifications);
