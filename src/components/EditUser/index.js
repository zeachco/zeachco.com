import React, {Component} from 'react';
import actions from '../../store/actions';
// import store from '../../store';
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
    return (
      <div className="user-editor">
        <div className="user-editor__mask" onClick={this.props.onClose}></div>
        <div className="user-editor__content">
          <h1>Création d'un usager</h1>
          <form onSubmit={e => {
            e.preventDefault();
            const user = {};
            ['username', 'space', 'password'].forEach(f => user[f] = e.target.querySelector('[name="' + f + '"]').value);
            this.save(user);
          }}>
            <input type="text" className="form-control" name="username" placeholder="Utilisateur"/>
            <input type="text" className="form-control" name="space" placeholder="Espace"/>
            <input type="text" className="form-control" name="password" placeholder="Mot de passe"/>
            <hr/>
            <input className="btn btn-primary" type="submit" placeholder="password"/>
          </form>
        </div>
      </div>
    );
  }
}
