import React from 'react'
import User from './User';

const UserList = (props) => (
  <div>{props.users.map(u => (<User key={u._id} {...u}/>))}</div>
);

UserList.propTypes = {
  users: React.PropTypes.array.isRequired
}

export default UserList
