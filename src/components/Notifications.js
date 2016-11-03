import React from 'react';

const style = {
    position: 'fixed',
    display: 'block',
    top: 0,
    left: '50%',
    background: 'gray',
    marginLeft: -100,
    width: 200
};

export const Notifications = ({
    type,
    message,
    ...props
}) => (
    <div style={style}></div>
);
