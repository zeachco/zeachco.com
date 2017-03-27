import React from 'react'
import axios from 'axios'
import { browserHistory } from 'react-router'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

import session from '../store/actions/session'
import Base from './Base'

class Signup extends React.Component {
  constructor(...props) {
    super(...props)
    this.state = {}
  }
  submit(ev) {
    ev.preventDefault()
    let username = ev.target.user.value
    let password = ev.target.pass1.value
    let confirm = ev.target.pass2.value
    if (!password || !username) {
      return this.setState({message: 'Vous devez remplir tout les champs', msgType: 'danger', loading: false})
    }
    if (password === confirm) {
      this.setState({message: 'Vérification...', msgType: 'info', loading: true})
      axios
        .post('/api/users', {username, password})
        .then(() => {
          this.setState({message: 'Utilisateur Créé!', msgType: 'success', loading: false})
          session.login(username, password)
          browserHistory.push('/')
        })
        .catch(xhr => {
          if (xhr.response.status === 409) {
            this.setState({message: 'Cet usager existe déjà', msgType: 'danger', loading: false})
          } else {
            this.setState({message: 'Une erreur est survenue', msgType: 'danger', loading: false})
          }
        });
    } else {
      this.setState({message: 'Votre mot de passe n\'est pas identique', msgType: 'danger', loading: true})
    }
  }
  render() {
    const {message, msgType, loading} = this.state;
    return (
      <Base id="login">
        <form
          disabled={loading}
          onSubmit={this
          .submit
          .bind(this)}>
          <h2>Créez votre compte</h2>
          {message && (
            <p className={`alert alert-${msgType || 'info'}`}>{message}</p>
          )}
          <div>
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
          </div>
        </form>
      </Base>
    );
  }
}

export default Signup
