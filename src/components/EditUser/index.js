import React, {Component, PropTypes} from 'react';
import AutoBin from 'auto-bind';
import {connect} from 'react-redux';

import './style.css';
import { create, update, editUser } from '../../store/actions/users';
import store from '../../store';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    AutoBin(this);
  }

  componentWillReceiveProps({ user }) {
    this.setState({ user });
  }

  save(user) {
    if(user._id) update(user);
    else create(user);
  }

  handleSaveSubmit(e) {
      e.preventDefault();
      const user = {};
      [
        'username',
        'firstName',
        'lastName',
        'space',
        'password'
      ].forEach(f => user[f] = e.target.querySelector('[name="' + f + '"]').value);
      
      this.save(user).then(() => editUser(null));
  }

  render() {
    // TODO user connect instead
    const {spaces} = store.getState().session;
    const {
      message,
      messageType = 'default'
    } = store.getState().users;
    const {user} = this.props;
    if(!user) return null;
    return (
      <div className="user-editor">
        <div className="user-editor__mask" onClick={() => editUser(null)}></div>
        <div className="user-editor__content">
          <h2>Création d'un usager</h2>
          {message && (
            <div className={'alert alert-' + messageType}>{message}</div>
          )}
          <form onSubmit={this.handleSaveSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="control-label">Utilisateur</label>
              <input type="text" className="form-control" name="username" placeholder="username@email.com"/>
            </div>

            <div className="form-group">
              <label htmlFor="firstName" className="control-label">Prénom</label>
              <input type="text" className="form-control" name="firstName" placeholder="John"/>
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="control-label">Nom</label>
              <input type="text" className="form-control" name="lastName" placeholder="Smith"/>
            </div>

            <div className="form-group">
              <label htmlFor="space" className="control-label">Espace</label>
              <select className="form-control" name="space">
                {spaces.map(space => (
                  <option key={space} value={space}>{space}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="pass" className="control-label">Mot de passe</label>
              <input type="text" className="form-control" name="password" placeholder="Mot de passe"/>
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
}

const mapStateToProps = state => ({
  user: state.users.editedUser
});

export default connect(mapStateToProps)(EditUser);
