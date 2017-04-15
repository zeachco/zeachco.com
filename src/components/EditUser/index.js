import React, {Component, PropTypes} from 'react';
import AutoBin from 'auto-bind';
import {connect} from 'react-redux';

import './style.css';
import Translate from '../Translate';
import { createOrUpdate, editUser } from '../../store/actions/users';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    AutoBin(this);
  }

  componentWillReceiveProps({ user }) {
    this.setState(user);
  }

  updateState(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSaveSubmit(e) {
      e.preventDefault();
      createOrUpdate(this.state).then(() => editUser(null));
  }

  render() {
    const {
      user,
      spaces
    } = this.props;

    // No user to edit... don't show
    if(!user) return null;


    const {
      firstName,
      lastName,
      username,
      space,
      password
    } = this.state;
    
    return (
      <div className="user-editor">
        <div className="user-editor__mask" onClick={() => editUser(null)}></div>
        <div className="user-editor__content">
          <h2><Translate content="create_user" /></h2>
          <form onChange={this.updateState} onSubmit={this.handleSaveSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="control-label"><Translate content="user" /></label>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="username@email.com"
                value={username}
              />
            </div>

            <div className="form-group">
              <label htmlFor="firstName" className="control-label"><Translate content="first_name" /></label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="John"
                value={firstName}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="control-label"><Translate content="last_name" /></label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Smith"
                value={lastName}
              />
            </div>

            <div className="form-group">
              <label htmlFor="space" className="control-label"><Translate content="space_name" /></label>
              <select className="form-control" name="space" value={space}>
                {spaces.map(s => (<option key={s} value={s}>{s}</option>))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="pass" className="control-label"><Translate content="password" /></label>
              <input
                type="text"
                className="form-control"
                name="password"
                placeholder="********"
                value={password}
              />
            </div>
            <input className="btn btn-primary" type="submit" defaultValue="Création"/>&nbsp;
            <input className="btn btn-secondary" type="button" onClick={() => editUser(null)} defaultValue="Fermer"/>
          </form>
        </div>
      </div>
    );
  }
}

EditUser.propTypes = {
  spaces: PropTypes.array.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
    key: PropTypes.string,
    roles: PropTypes.array,
    meta: PropTypes.object
  })
};

const mapStateToProps = ({users, session}) => ({
  user: users.editedUser,
  spaces: session.spaces
});

export default connect(mapStateToProps)(EditUser);
