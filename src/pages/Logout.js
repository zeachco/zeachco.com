import React from 'react'
import {connect} from 'react-redux'

import session from '../store/actions/session'
import Base from './Base'

class Logout extends React.Component {
  componentDidMount() {
    session.logout()
  }
  render() {
    return (
      <Base>
        <p className="well well-info">Déconnection en cours...</p>
      </Base>
    )
  }
}

const mapStatetoProps = (store) => ({
  isAuth: store.session.isAuth,
  isLoading: store.session.isLoading,
  session: store.session
});

export default connect(mapStatetoProps)(Logout)
