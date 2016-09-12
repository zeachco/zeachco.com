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
    actions.users.fetch();
  }

  searchFilter(user) {
    const {search} = this.state;
    let match = false;
    ['username', 'space', 'firstName', 'lastName', 'email'].forEach(f => {
      if (user[f].toLowerCase().indexOf(search.toLowerCase()) > -1) {
        match = true;
      }
    });
    return match;
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

const ConnectedUsers = connect(mapStatetoProps)(Users);
export {ConnectedUsers as Users};
export default ConnectedUsers;
