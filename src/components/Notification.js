import React from 'react';

export const Notification = ({data}) => (<div className={`alert alert-${data.type || 'info'}`}>{data.message}</div>);
