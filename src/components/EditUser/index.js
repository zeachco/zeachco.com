import React, {Component} from 'react';
import actions from '../../store/actions';
import store from '../../store';
import './style.css';

export class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  save(user) {
    actions.users.create(user);
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
          <h1>Création d'un usager</h1>
          {message && (
            <div className={'alert alert-' + messageType}>{message}</div>
          )}
          <form onSubmit={e => {
            e.preventDefault();
            const user = {};
            ['username', 'space', 'password'].forEach(f => user[f] = e.target.querySelector('[name="' + f + '"]').value);
            this.save(user).then(this.props.onClose);
          }}>
            <div className="form-group">
              <label htmlFor="username" className="control-label">Utilisateur</label>
              <input type="text" className="form-control" name="username" placeholder="Utilisateur"/>
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
