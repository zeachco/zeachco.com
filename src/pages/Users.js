import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../store/actions';
import {UserList} from '../components';
import {Base} from '.';
class Users extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }
  render() {
    const {users} = this.props;
    return (
      <Base>
        <h1>Utilisateurs</h1>
        <UserList users={users}/>
      </Base>
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
