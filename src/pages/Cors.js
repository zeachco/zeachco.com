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
        <h2>this domain have been authorized</h2>
      </Base>
    );
  }
}

export default CorsPage
