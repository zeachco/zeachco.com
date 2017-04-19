import React, {Component, PropTypes} from 'react';
import AutoBin from 'auto-bind';
import {connect} from 'react-redux';

import './EditUser.css';
import Translate from './Translate';
import { createOrUpdate, editUser, destroy } from '.././store/actions/users';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    AutoBin(this);
  }

  componentWillReceiveProps({ user }) {
    this.setState({...user, password: ''});
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
      _id,
      firstName,
      lastName,
      username,
      space,
      password = ''
    } = this.state;
    
    return (
      <div className="user-editor">
        <div className="user-editor__mask" onClick={() => editUser(null)}></div>
        <div className="user-editor__content">
          <h2><Translate content={_id ? 'user' : 'create_user'}/>{' '}<small>{_id}</small></h2>
          <form onChange={this.updateState} onSubmit={this.handleSaveSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="control-label"><Translate content="user" /></label>
              <input
                type="text"
                autoComplete={false}
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
                autoComplete={false}
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
                autoComplete={false}
                className="form-control"
                name="lastName"
                placeholder="Smith"
                value={lastName}
              />
            </div>

            <div className="form-group">
              <label htmlFor="space" className="control-label"><Translate content="space_name" /></label>
              <select className="form-control" name="space" value={space}>
                <option value={' '}><Translate content="select_space"/></option>
                {spaces.map(s => (<option key={s} value={s}>{s}</option>))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="pass" className="control-label"><Translate content="password" /></label>
              <input
                type="text"
                autoComplete={false}
                className="form-control"
                name="password"
                placeholder="[unchanged]"
                value={password}
              />
            </div>
            <button className="btn btn-primary" type="submit"><Translate content={_id ? 'save' : 'create_user'}/></button>&nbsp;
            {_id && <button className="btn btn-danger" type="button" onClick={() => destroy(_id)}><Translate content="delete"/></button>}&nbsp;
            <button className="btn btn-secondary" type="button" onClick={() => editUser(null)}><Translate content="close"/></button>
          </form>
        </div>
      </div>
    );
  }
}

EditUser.propTypes = {
  spaces: PropTypes.array.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
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
