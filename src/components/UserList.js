import React from 'react'
// import {Link} from 'react-router';
// import {LinkContainer} from 'react-router-bootstrap';
import {User} from '.';

const UserList = (props) => (
  <div>{props.users.map(u => (<User {...u}/>))}</div>
);

export {UserList};
