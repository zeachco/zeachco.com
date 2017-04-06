import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetch } from '../store/actions/users';
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

  add() {
    this.setState({showAdd: true});
  }

  render() {
    const {users} = this.props;
    const {showAdd} = this.state;
    return (
      <Base>
        <h2><Translate content="Users"/></h2>
        <input type="text" className="form-control" autoFocus={true} placeholder="Recherche" onKeyUp={e => this.setState({search: e.target.value})}/>
        <UserList users={users.filter(this.searchFilter.bind(this))}/>
        <button onClick={this.add.bind(this)} className="btn btn-primary" style={{
          position: 'fixed',
          right: '2em',
          bottom: '1em'
        }}>Nouveau</button>
        {showAdd && <EditUser onClose={() => this.setState({showAdd: false})}/>}
      </Base>
    )
  }
}

Users.propTypes = {
  users: PropTypes.array.isRequired
};

const mapStatetoProps = store => ({
  isLoading: store.users.isLoading,
  users: store.users.data || []
});

export default connect(mapStatetoProps)(Users);
