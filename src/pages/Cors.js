import React, {Component} from 'react';

import './Cors.css';
import Base from './Base';

class CorsPage extends Component {
  componentDidMount() {
    // safari default settings force the auth domain to have been visited and a cookie to be set
    document.cookie = "username=John Doe";
  }

  close() {
    window.close();
  }

  render() {
    return (
      <Base>
        <div className="cors-message">
          <h2>this domain have been authorized</h2>
          <button className="btn btn-primary" onClick={this.close.bind(this)}>Close this window</button>
        </div>
      </Base>
    );
  }
}

export default CorsPage
