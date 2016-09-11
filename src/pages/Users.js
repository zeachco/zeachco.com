import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../store/actions';
import {UserList} from '../components';
class Users extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }
  render() {
    const {users} = this.props;
    return (
      <div>
        <h1>Utilisateurs</h1>
        <UserList users={users}/>
      </div>
    )
  }
}

const mapStatetoProps = (store, ownProps) => ({
  isLoading: store.users.isLoading,
  users: store.users.data || []
});

const mapDispatchToProps = (dispatch, ownProps) => ({loadUsers: actions.users.fetch});

const ConnectedUsers = connect(mapStatetoProps, mapDispatchToProps)(Users);
export {ConnectedUsers as Users};
export default ConnectedUsers;
