import React from 'react';

const Notification = ({data}) => (<div className={`alert alert-${data.type || 'info'}`}>{data.message}</div>);

Notification.propTypes = {
    data: React.PropTypes.object.isRequired
}

export default Notification
