import React from 'react'
import {User} from '.';

export const UserList = (props) => (
  <div>{props.users.map(u => (<User key={u._id} {...u}/>))}</div>
);
