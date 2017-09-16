import React, {Component, PropTypes} from 'react'

import './style.css';
import { destroy } from '../../store/actions/users';
import store from '../../store';

class User extends Component {
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
    const {spaces} = store.getState().get('old').session;
    return (
      <div className="well">
        <small style={{
          float: 'right',
          color: '#888'
        }}>{_id}</small>
        <h4>{firstName + ' ' + lastName}</h4>
        <p>{email}</p>

        <div className="form-group">
          <label htmlFor="space" className="control-label">Espace</label>
          <select className="form-control" name="space">
            {spaces.map(space => (
              <option key={space} value={space}>{space}</option>
            ))}
          </select>
        </div>
        <div>{this.checkbox('images', true, 'Peut voir les images')}</div>
        <div>{this.checkbox('prices', true, 'Peut voir les prix')}</div>
        <hr/>
        <button className="btn btn-danger" onClick={() => destroy(_id)}>Détruire</button>
      </div>
    );
  }

  render() {
    const {username, firstName, lastName, space, onClick} = this.props;
    return (
      <div>
        <div onClick={onClick(this).toggle} className="user_row">
          <h3>{[firstName, lastName].join(' ')}<small>({username})</small></h3>
          <span className="label label-default">{space}</span>
        </div>
        {this.state.opened && this.renderDetails()}
      </div>
    )
  }
}

User.propTypes = {
  username: PropTypes.string.isRequired,
  space: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default User;
