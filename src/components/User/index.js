import './User.css';
import React, {Component} from 'react'

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

  renderDetails() {
    return (
      <pre>{JSON.stringify(this.props, null, 2)}</pre>
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
