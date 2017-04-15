import React, {PropTypes} from 'react';
import { editUser } from '../store/actions/users';

import './UserList.css';

const UserList = ({users}) => {
  const userMap = (user) => {
    return (
      <div key={user._id}>
          <div onClick={() => editUser(user._id)} className="user_row">
            <h3>{[user.firstName, user.lastName].join(' ')}<small>({user.username})</small></h3>
            <span className="label label-default">{user.space}</span>
          </div>
      </div>
    );
  } 

  return (<div>{users.map(userMap)}</div>);
};

UserList.propTypes = {
  users: PropTypes.array.isRequired
};

export default UserList;
