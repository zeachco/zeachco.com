import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../store/actions';
import {UserList} from '../components';
import {Base} from '.';
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }
  componentDidMount() {
    this.props.loadUsers();
  }

  searchFilter(user) {
    const {search} = this.state;
    return user.username.indexOf(search) > -1 || user.space.indexOf(search) > -1;
  }
  render() {
    const {users} = this.props;
    return (
      <Base>
        <h1>Utilisateurs</h1>
        <input type="text" className="form-control" autoFocus={true} placeholder="Recherche" onKeyUp={e => this.setState({search: e.target.value})}/>
        <UserList users={users.filter(this.searchFilter.bind(this))}/>
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
