import React, {Component} from 'react';
import { connect } from 'react-redux';

import Translate from './Translate'
import { profileUpdate } from '../store/actions/session';

class ProfileForm extends Component {
  constructor(...props) {
    super(...props);
    this.state = this.props.session;
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps.session);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    profileUpdate(this.state);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)} onChange={this.onChange.bind(this)}>
        <div className="col-lg-6">
          <div className="panel panel-default">
            <div className="panel-heading"><Translate content="user"/></div>
            <div className="panel-body">
              <div className="col-md-6">
                <label><Translate content="first_name" /></label>
                <input className="form-control col-md-6" type='text' label='Prénom' name='firstName' validate='required' value={this.state.firstName} errorHelp={{
                  required: 'Veuillez entrer votre prénom'
                }}/>
              </div>
              <div className="col-md-6">
                <label><Translate content="last_name" /></label>
                <input className="form-control" type='text' label='Nom' name='lastName' validate='required' value={this.state.lastName} errorHelp={{
                  required: 'Veuillez entrer votre nom de famille'
                }}/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="panel panel-default">
            <div className="panel-heading"><Translate content="login" /></div>
            <div className="panel-body">
              <div className="col-md-4">
                <label><Translate content="email" /></label>
                <input className="form-control" type='text' label='Courriel' name='email' validate='required,isEmail' palceholder={this.state.email} value={this.state.email} errorHelp={{
                  required: 'Veuillez entrer votre courriel',
                  isEmail: 'Courriel invalide'
                }}/>
              </div>
            </div>
          </div>
        </div>
        <button type='submit' className='btn btn-primary btn-large'><Translate content="save"/></button>
      </form>
    );
  }
}

ProfileForm.propTypes = {
  isAuth: React.PropTypes.bool.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  session: React.PropTypes.bool.isRequired
}

const mapStatetoProps = (store) => ({
  isAuth: store.session.isAuth,
  isLoading: store.session.isLoading,
  session: store.session
});

module.exports = connect(mapStatetoProps)(ProfileForm);
