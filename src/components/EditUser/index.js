import React, {Component} from 'react';
import AutoBin from 'auto-bind';

import './style.css';
import { create } from '../../store/actions/users';
import store from '../../store';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    AutoBin(this);
  }

  save(user) {
    create(user);
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
      
      this.save(user).then(this.props.onClose);
  }

  render() {
    const {spaces} = store.getState().session;
    const {
      message,
      messageType = 'default'
    } = store.getState().users;
    return (
      <div className="user-editor">
        <div className="user-editor__mask" onClick={this.props.onClose}></div>
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
            <input className="btn btn-secondary" type="button" onClick={this.props.onClose} defaultValue="Fermer"/>
          </form>
        </div>
      </div>
    );
  }
}

EditUser.propTypes = {
  onClose: React.PropTypes.func.isRequired
}

export default EditUser
