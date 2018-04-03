import React, {Component} from 'react';

import Base from './Base';

class CorsPage extends Component {
  componentDidMount() {
    // safari default settings force the auth domain to have been visited and a cookie to be set
    document.cookie = "username=John Doe";
  }
  render() {
    return (
      <Base>
        <h2>Please wait for this window to close</h2>
      </Base>
    );
  }
}

export default CorsPage
