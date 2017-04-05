import React from 'react'

import Translate from '../components/Translate'
import session from '../store/actions/session'
import Base from './Base'

const Logout = () => (
  <Base>
    <h1><Translate content="disconnect_title"/></h1>
    <button className="btn btn-danger" onClick={session.logout}><Translate content="disconnect"/></button>
  </Base>
);

export default Logout
