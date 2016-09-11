import React from 'react'
// import {Link} from 'react-router';
// import {LinkContainer} from 'react-router-bootstrap';

const User = (props) => {
  const {username} = props;
  return (
    <div>
      <h3>{username}</h3>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
};

export {User};
