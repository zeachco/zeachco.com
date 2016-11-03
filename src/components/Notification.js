import React from 'react';

export const Notification = ({
    type,
    message,
    ...props
}) => (
    <div className={`alert alert-${type || 'default'}`} {...props}>{message}</div>
);
