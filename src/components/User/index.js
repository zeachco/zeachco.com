import './User.css';
import React, {Component} from 'react'
import actions from '../../store/actions';

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  toggle() {
    this.setState({
      opened: !this.state.opened
    })
  }

  checkbox(attrName, value, label) {
    return (
      <label><input readOnly={true} type="checkbox" checked={value} value={attrName}/>&nbsp;{label}</label>
    );
  }

  renderDetails() {
    const {_id, firstName, lastName, email} = this.props;
    return (
      <div className="well">
        <small style={{
          float: 'right',
          color: '#888'
        }}>{_id}</small>
        <h4>{firstName + ' ' + lastName}</h4>
        <p>{email}</p>
        <div>{this.checkbox('images', true, 'Peut voir les images')}</div>
        <div>{this.checkbox('prices', true, 'Peut voir les prix')}</div>
        <hr/>
        <button className="btn btn-danger" onClick={e => actions.users.destroy(_id)}>Détruire</button>
      </div>
    );
  }

  render() {
    const {username, space} = this.props;
    return (
      <div>
        <div onClick={this.toggle.bind(this)} className="user_row">
          <h3>{username}</h3>
          <span className="label label-default">{space}</span>
        </div>
        {this.state.opened && this.renderDetails()}
      </div>
    )
  }
}
