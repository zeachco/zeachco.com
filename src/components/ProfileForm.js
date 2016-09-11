import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../store/actions';

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
    actions.session.profileUpdate(this.state);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)} onChange={this.onChange.bind(this)}>
        <div className="col-lg-6">
          <div className="panel panel-default">
            <div className="panel-heading">Utilisateur</div>
            <div className="panel-body">
              <div className="col-md-6">
                <input className="form-control col-md-6" type='text' label='Prénom' name='firstName' validate='required' value={this.state.firstName} errorHelp={{
                  required: 'Veuillez entrer votre prénom'
                }}/>
              </div>
              <div className="col-md-6">
                <input className="form-control" type='text' label='Nom' name='lastName' validate='required' value={this.state.lastName} errorHelp={{
                  required: 'Veuillez entrer votre nom de famille'
                }}/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="panel panel-default">
            <div className="panel-heading">Usager</div>
            <div className="panel-body">
              <div className="col-md-4">
                <input className="form-control" type='text' label='Courriel' name='email' validate='required,isEmail' palceholder={this.state.email} value={this.state.email} errorHelp={{
                  required: 'Veuillez entrer votre courriel',
                  isEmail: 'Courriel invalide'
                }}/>
              </div>
            </div>
          </div>
        </div>
        <button type='submit' className='btn btn-primary btn-large'>Enregistrer</button>
      </form>
    );
  }
}

const mapStatetoProps = (store, ownProps) => ({
  isAuth: store.session.isAuth,
  isLoading: store.session.isLoading,
  session: store.session,
  items: store.items || []
});

// const ProfileForm = props => (<pre>Unavailable...</pre>);

const mapDispatchToProps = (dispatch, ownProps) => ({});
module.exports = connect(mapStatetoProps, mapDispatchToProps)(ProfileForm);
