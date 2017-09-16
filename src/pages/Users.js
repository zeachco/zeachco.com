import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetch, editUser } from '../store/actions/users';
import UserList from '../components/UserList'
import EditUser from '../components/EditUser'
import Translate from '../components/Translate'
import Base from './Base';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  componentDidMount() {
    fetch();
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
        <h2><Translate content="users"/></h2>
        <input type="text" className="form-control" autoFocus={true} placeholder="Recherche" onKeyUp={e => this.setState({search: e.target.value})}/>
        <UserList users={users.filter(this.searchFilter.bind(this))} />
        <button onClick={() => editUser('new')} className="btn btn-primary" style={{
          position: 'fixed',
          right: '2em',
          bottom: '1em'
        }}>Nouveau</button>
        <EditUser/>
      </Base>
    );
  }
}

Users.propTypes = {
  users: PropTypes.array.isRequired
};

const mapStatetoProps = store => ({
  isLoading: store.get('old').users.isLoading,
  users: store.get('old').users.data || []
});

export default connect(mapStatetoProps)(Users);
