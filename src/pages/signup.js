import React from 'react';
import store from '../core/store';
import bridge from '../core/bridge';
import {browserHistory} from 'react-router';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

class LoginPage extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {};
  }
  componentDidMount() {
    // bridge.delete('/api/v2/logout');
  }
  componentWillUnmount() {
    // console.log('unmount!');
  }
  submit(ev) {
    ev.preventDefault();
    let username = ev.target.user.value;
    let password = ev.target.pass1.value;
    let confirm = ev.target.pass2.value;
    if (password === confirm) {
      this.setState({message: 'Vérification...', loading: true});
      bridge.post('/api/v2/users', {username, password}).then(data => {
        this.setState({message: 'created!', loading: false});
        store.set('auth', data);
        browserHistory.push('/');
      });
    } else {
      this.setState({message: 'Votre mot de passe n\'est pas identique', loading: true});
    }
  }
  render() {
    return (
      <div id="login">
        <form disabled={this.state.loading} onSubmit={this.submit.bind(this)}>
          <h1>Créez votre compte</h1>
          <p>{this.state.message}</p>
          <p>
            <FormGroup controlId="user">
              <ControlLabel>Utilisateur</ControlLabel>
              <FormControl type="text" autoFocus placeholder="email@domain.xyz"/>
            </FormGroup>
            <FormGroup controlId="pass1">
              <ControlLabel>Mot de passe</ControlLabel>
              <FormControl type="password" placeholder="********"/>
            </FormGroup>
            <FormGroup controlId="pass2">
              <ControlLabel>Confirmation de mot de passe</ControlLabel>
              <FormControl type="password" placeholder="********"/>
            </FormGroup>
            <Button bsStyle="primary" type="submit">Valider</Button>
          </p>
        </form>
      </div>
    );
  }
}

export default LoginPage;
